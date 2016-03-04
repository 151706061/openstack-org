<?php

class SummitVideoApp extends Page {

}


class SummitVideoApp_Controller extends Page_Controller {
	
	private static $url_handlers = [
		'api' => 'handleAPI',
		'$Action/$ID/$OtherID' => 'handleIndex'
	];


	public function getJSONConfig () {
		return Convert::array2json([
			'baseURL' => $this->Link(),
			'initialState' => [
				'videos' => [
					[
						'id' => 1,
						'date' => 'Today',
						'title' => 'Video one',
						'presentation' => [
							'title' => 'Presentation one'
						],
						'summit' => [
							'title' => 'Austin summit'
						],
						'speaker' => [
							'name' => 'Jonathan Bryce'
						],
						'image' => 'http://lorempixel.com/232/130/'
					],
					[
						'id' => 2,
						'date' => 'Today',
						'title' => 'Video two',
						'presentation' => [
							'title' => 'Presentation two'
						],
						'summit' => [
							'title' => 'Austin summit'
						],
						'speaker' => [
							'name' => 'Jonathan Bryce'
						],
						'image' => 'http://lorempixel.com/232/130/'
					],
					[
						'id' => 3,
						'date' => 'Yesterday',
						'title' => 'Video three',
						'presentation' => [
							'title' => 'Presentation three'
						],
						'summit' => [
							'title' => 'Tokyo summit'
						],
						'speaker' => [
							'name' => 'Jonathan Bryce'
						],
						'image' => 'http://lorempixel.com/232/130/'
					],
					[
						'id' => 4,
						'date' => 'February 12, 2016',
						'title' => 'Video four',
						'presentation' => [
							'title' => 'Presentation four'
						],
						'summit' => [
							'title' => 'Vancouver summit'
						],
						'speaker' => [
							'name' => 'Jonathan Bryce'
						],
						'image' => 'http://lorempixel.com/232/130/'
					]

				]
			]
		]);
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
		$this->parent = $parent;
	}


	public function videos(SS_HTTPRequest $r) {

	}

}