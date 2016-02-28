<?php

class SummitVideoApp extends Page {

}


class SummitVideoApp_Controller extends Page_Controller {
	
	private static $url_handlers = array (
		'$Action/$ID/$OtherID' => 'handleIndex'
	);


	public function getJSONConfig () {
		return Convert::array2json([
			'baseURL' => $this->Link()
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