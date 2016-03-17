<?php

class SummitVideoAppTest extends SapphireTest {


	protected static $fixture_file = 'SummitVideoAppTest.yml';


	public function testPresentationVideosUpdateTheirUploadDate() {
		$video = new PresentationVideo();
		$video->write();
		$this->assertNull($video->DateUploaded);

		$video->YouTubeID = '123';
		$video->write();
		$this->assertEquals(
			date('Y-m-d'),
			$video->obj('DateUploaded')->Format('Y-m-d')
		);
	}
}