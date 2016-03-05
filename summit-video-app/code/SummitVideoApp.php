<?php

class SummitVideoApp extends Page {

}


class SummitVideoApp_Controller extends Page_Controller {
	

	private static $url_handlers = [
		'api' => 'handleAPI',
		'$Action/$ID/$OtherID' => 'handleIndex'
	];

	
	private static $allowed_actions = [
		'handleAPI',
	];

	
	public function getJSONConfig () {
		return Convert::array2json([
			'baseURL' => $this->Link(),
			'initialState' => [
				'videos' => []
			]
		]);
	}


	public function handleAPI (SS_HTTPRequest $r) {
		$handler = new SummitVideoApp_API($this);
		
		return $handler->handleRequest($r, DataModel::inst());
	}


	public function IsDev() {
		return Director::isDev();
	}
    
    
    public function WebpackDevServer() {
        if(Director::isDev()) {        	
            $socket = @fsockopen('10.0.2.2', 3000, $errno, $errstr, 1);            
            return !$socket ? false : true;
        }
    }		
}


class SummitVideoApp_API extends RequestHandler {

	private static $allowed_actions = [
		'videos',
	];


	protected $parent;


	public function __construct(SummitVideoApp_Controller $parent) {
		parent::__construct();
		$this->parent = $parent;
	}


	public function videos(SS_HTTPRequest $r) {
		$videos = PresentationVideo::get()
					->limit(SummitVideoApp::config()->default_video_limit)
					->sort('LastEdited', 'DESC');

		$response = [];
		foreach($videos as $v) {
			$response[] = $this->createVideoJSON($v);
		}

		return (new SS_HTTPResponse(Convert::array2json($response), 200))
					->addHeader('Content-Type', 'application/json');
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
			'thumbnailURL' => "http://img.youtube.com/vi/{$v->YouTubeID}/2.jpg",
			'summit' => [
				'id' => $v->Presentation()->SummitID,
				'title' => $v->Presentation()->Summit()->Title
			],
			'speakers' => $speakers
		];
	}

}