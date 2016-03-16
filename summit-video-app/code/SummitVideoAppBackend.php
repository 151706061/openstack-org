<?php

class SummitVideoAppBackend {

	public function getVideos($params = []) {		
		$summit = null;
		$speaker = null;

		$videos = PresentationVideo::get()
					->limit(SummitVideoApp::config()->default_video_limit)
					->sort('LastEdited', 'DESC');

		if(isset($params['summit'])) {
			$summit = Summit::get()->byID($params['summit']);			
			if($summit) {
				$videos = $videos
					->innerJoin('SummitEvent', 'SummitEvent.ID = PresentationMaterial.PresentationID')
					->filter('SummitEvent.SummitID', $summit->ID);
			}
			else {
				$videos = [];
			}
		}

		else if(isset($params['speaker'])) {
			$speaker = PresentationSpeaker::get()->byID($params['speaker']);
			if($speaker) {
				$videos = $videos
					->innerJoin('Presentation','Presentation.ID = PresentationMaterial.PresentationID')
					->innerJoin('Presentation_Speakers','Presentation_Speakers.PresentationID = Presentation.ID')
					->filter('Presentation_Speakers.PresentationSpeakerID', $speaker->ID);
			}
			else {
				$videos = [];
			}
		}

		else if(isset($params['popular'])) {
			$views = SummitVideoApp::config()->popular_video_view_threshold;
			$videos = $videos->filter([
						'Views:GreaterThan' => $views
					])
					->sort('Views DESC');
		}

		else if(isset($params['highlighted'])) {
			$videos = $videos->filter([
						'Highlighted' => true
					]);
		}

		else if(isset($params['search'])) {
			$videos = $videos						
						->innerJoin('Presentation','Presentation.ID = PresentationMaterial.PresentationID')
						->innerJoin('SummitEvent','SummitEvent.ID = Presentation.ID')
						->innerJoin('Presentation_Speakers', 'Presentation_Speakers.PresentationID = Presentation.ID')
						->innerJoin('PresentationSpeaker','PresentationSpeaker.ID = Presentation_Speakers.PresentationSpeakerID')
						->leftJoin('PresentationCategory', 'PresentationCategory.ID = Presentation.CategoryID');				

			$parts = preg_split('/\s+/', $params['search']);
			$titleFilters = [];
			$speakerFilters = [];
			$topicFilters = [];

			foreach($parts as $part) {
				$titleFilters['Presentation.Title:PartialMatch'] = $part;
				$speakerFilters['PresentationSpeaker.FirstName:PartialMatch'] = $part;
				$speakerFilters['PresentationSpeaker.LastName:PartialMatch'] = $part;
				$topicFilters['PresentationCategory.Title:PartialMatch'] = $part;
			}

			$titleVideos = $videos->filterAny($titleFilters);
			$speakerVideos = $videos->filterAny($speakerFilters);
			$topicVideos = $videos->filterAny($topicFilters);

			$response = [
				'results' => [
					'titleMatches' => [],
					'speakerMatches' => [],
					'topicMatches' => []
				]
			];
			foreach($titleVideos as $v) {
				$response['results']['titleMatches'][] = $this->createVideoJSON($v);
			}
			foreach($speakerVideos as $v) {
				$response['results']['speakerMatches'][] = $this->createVideoJSON($v);
			}
			foreach($topicVideos as $v) {
				$response['results']['topicMatches'][] = $this->createVideoJSON($v);
			}

			return $response;
		}

		$response = [
			'summit' => $summit ? $this->createSummitJSON($summit) : null,
			'speaker' => $speaker ? $this->createSpeakerJSON($speaker) : null,
			'results' => []
		];

		foreach($videos as $v) {
			$response['results'][] = $this->createVideoJSON($v);
		}
		
		return $response;		
	}



	public function getFeaturedVideo() {
		$video = PresentationVideo::get()
				->filter('Featured', true)
				->first();
		
		return $video ? $this->createVideoJSON($video) : null;
	}


	public function getLatestVideo() {
		$video = PresentationVideo::get()
				->sort('LastEdited DESC')
				->first();

		return $video ? $this->createVideoJSON($video) : null;
	}


	public function getSpeakers(SS_HTTPRequest $r) {
		$speakers = PresentationSpeaker::get()
						->innerJoin('Presentation_Speakers','Presentation_Speakers.PresentationSpeakerID = PresentationSpeaker.ID')
						->innerJoin('Presentation','Presentation.ID = Presentation_Speakers.PresentationID')
						->sort('COUNT(Presentation_Speakers.ID) DESC')
						->limit(20)
						->alterDataQuery(function ($query) {
							$query->groupby('PresentationSpeaker.ID');
						});

		$response = [
			'results' => []
		];

		foreach($speakers as $s) {
			$response['results'][] = $this->createSpeakerJSON($s);
		}
		
		return $response;		
	}


	public function getSummits(SS_HTTPRequest $r) {
		$summits = Summit::get()
					->filter('SummitBeginDate:LessThan', SS_DateTime::now()->Rfc2822())
					->sort('SummitBeginDate DESC');

		$response = [
			'results' => []
		];

		foreach($summits as $s) {
			$response['results'][] = $this->createSummitJSON($s);
		}
		
		return $response;		
	}


	public function getVideoDetail($id) {
		$video = PresentationVideo::get()->byID($id);

		if($video) {
			return $this->createVideoJSON($video);
		}
	}


	protected function createVideoJSON(PresentationVideo $v) {		
		$speakers = array_map(function ($s) {
			return [
				'id' => $s->ID,
				'name' => $s->getName()
			];
		}, $v->Presentation()->Speakers()->toArray());

		return [
			'id' => $v->ID,
			'title' => $v->Name,
			'date' => $v->obj('LastEdited')->Format('Y-m-d'),
			'thumbnailURL' => "http://img.youtube.com/vi/{$v->YouTubeID}/3.jpg",
			'summit' => [
				'id' => $v->Presentation()->SummitID,
				'title' => $v->Presentation()->Summit()->Title
			],
			'youtubeID' => $v->YouTubeID,
			'speakers' => $speakers
		];
	}


	protected function createSummitJSON(Summit $s) {
		return [
			'id' => $s->ID,
			'title' => $s->Title,
			'dates' => $s->getSummitDateRange(),
			'videoCount' => PresentationVideo::get()->filter([
					'PresentationID' => $s->Presentations()->column('ID')
				])->count(),
			'imageURL' => ($s->Logo()->exists() && Director::fileExists($s->Logo()->URL)) ? 
								$s->Logo()->URL : 
								'http://placehold.it/200x100'
		];
	}


	protected function createSpeakerJSON(PresentationSpeaker $s) {
		return [
			'id' => $s->ID,
			'name' => $s->getName(),
			'jobTitle' => $s->Title,
			'imageURL' => ($s->Photo()->exists() && Director::fileExists($s->Photo()->URL)) ? 
								$s->Photo()->URL : 
								'http://placehold.it/200x100',
			'videoCount' => $s->Presentations()->count()
		];
	}

}