</div>

<% require themedCSS(videos) %>

<% loop Presentation %>

<% if $YouTubeID %>
<div class="single-video-wrapper">
	<iframe width="853" height="480" src="//www.youtube.com/embed/{$YouTubeID}?rel=0<% if Top.Autoplay %>&autoplay=1<% end_if %>" frameborder="0" allowfullscreen></iframe>
</div>
<% end_if %>
<div class="container single-video-details">
	<div class="row">
		<div class="col-sm-3 video-share">
			<a href="https://twitter.com/share" data-related="jasoncosta" data-lang="en" data-size="large" data-count="none"><i class="fa fa-twitter"></i></a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		</div>
		<div class="col-sm-9">
				<h3>$Name</h3>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12">
			<p class="single-video-description">
				$Description
			</p>
			<div class="row">
				<div class="col-lg-7 col-md-5 col-sm-7">
                    <%if Speakers %>
					<div class="video-speakers">
						<strong>Speakers:</strong>&nbsp;$Speakers
					</div>
                    <% end_if %>
				</div>
				<div class="col-sm-5">
					<!-- Slides -->
					<% if HasAttachmentOrLink %>
						<% if isFile %>

							<div class="video-media-wrapper">
								<p>
									<strong>Download slides:</strong>
								</p>
								<p class="video-media-title">
	                                $UploadedMedia.Name
								</p>
								<div class="media-btn-wrapper">
									<a href="{$UploadedMedia.Link}" class="media-btn"><i class="fa fa-cloud-download"></i> Download</a>
								</div>
							</div>

						<% else %>
							<% if HostedMediaURL %>
								<div class="video-media-wrapper">
									<p>
										<strong>Slides available here:</strong>
									</p>
									<p class="video-media-title">
		                                $HostedMediaURL
									</p>
									<div class="media-btn-wrapper">
										<a href="{$HostedMediaURL}" class="media-btn"><i class="fa fa-cloud-download"></i> Go</a>
									</div>
								</div>
							<% end_if %>
						<% end_if %>
					<% end_if %>


				</div>
			</div>
		</div>
	</div>
</div>
<% end_loop %>


<% include VideoThumbnails %>
