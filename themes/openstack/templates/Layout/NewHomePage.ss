</div>
<!-- Page Content -->
<div class="container">

</div>
<div class="intro-header featured">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-sm-6" style="padding-left: 0px; padding-right: 0px">
        <div class="intro-message">
          <h1>The Most Widely Deployed Open Source Cloud Software in the World</h1>
        </div>
        <p>
          Deployed by thousands. Proven production at scale. OpenStack is a set of software components that provide common services for cloud infrastructure.
        </p>
        <div class="promo-btn-wrapper">
          <a href="/software/project-navigator/" class="promo-btn">browse openstack components</a>
        </div>
        <p>
          OpenStack is developed by the community. For the community. <a class="intro-header-link" href="/community/">Learn how to contribute</a> <i class="fa fa-arrow-right"></i>
        </p>
      </div>
      <div class="col-lg-3 col-lg col-sm-6" style="padding-left: 0px; padding-right: 0px">
        <img src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/learn/homepage-OpenStack-SFAs.svg">
      </div>
    </div>
  </div>
</div>
<!-- /.intro-header -->

<!-- Page Content -->
<% include AnnouncementBanner %>
<!-- /.news-anniversary -->

<!-- Page Content -->

<div class="diagram-section">
<div class="container">
<div class="row">
<div class="col-lg-6 col-sm-12 col-xs-12">
<img width="100%" src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/learn/homepage-overview-diagram-new.svg">
</div>
<div class="col-lg-6 col-sm-12">
<h2>$CloudInfraTitle</h2>
<p>
$CloudInfraContent
</p>
<div class="diagram-btn-wrapper">
<a href="{$CloudInfraLink}" class="diagram-btn">read more</a>
</div>
</div>
</div>
<div class="row diagram-icons">
<div class="col-lg-4 col-xs-12 col-md-4 col-sm-4">
<a href="/marketplace/remotely-managed-private-clouds/"><img src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/learn/homepage-At-theEdge-Icon.svg"></a>
<a href="/marketplace/remotely-managed-private-clouds/" style="text-decoration:none;"><h2>On-Premises</h2></a>
<a href="/marketplace/remotely-managed-private-clouds/"><p>Host your cloud infrastructure internally or find an OpenStack partner in the Marketplace</p></a>
</div>
<div class="col-lg-4 col-xs-12 col-md-4 col-sm-4">
<a href="/marketplace/public-clouds/">
<img src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/learn/homepage-On-Premises-Icon.svg"></a>
<a href="/marketplace/public-clouds/" style="text-decoration:none;"><h2>Public Cloud</h2></a>
<a href="/marketplace/public-clouds/"><p>Leverage one of the 180+ OpenStack powered public cloud data centers</p></a>
</div>
<div class="col-lg-4 col-xs-12 col-md-4 col-sm-4">
<a href="/edge-computing/">
<img src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/learn/homepage-Public-Cloud-Icon.svg"></a>
<a href="/edge-computing/" style="text-decoration:none;"><h2>At the Edge</h2></a>
<a href="/edge-computing/"><p>Telecoms and retailers rely on OpenStack for their distributed systems</p></a>
</div>
</div>
</div>
</div>

<!-- /.diagram-section -->

<!-- Latest Release Block -->

<div class="section-ussuri">
  <div class="container">
    <h2>Latest Release: {$LatestReleaseName}</h2>
    <div class="video-container">
      <a href="{$LatestReleaseVideoLink}"><img class="ussuri-video" src="{$LatestReleaseVideoPosterUrl}"/></a>
    </div>
    <!-- <p>{$LatestReleaseVideoDescription}</p> -->
    <div class="ussuri-btn-wrapper">
    <a href="{$LatestReleaseCurrentButtonLink}" class="ussuri-btn">{$LatestReleaseCurrentButtonText}</a>
    <a href="{$LatestReleaseUpNextButtonLink}" class="ussuri-btn">{$LatestReleaseUpNextButtonText}</a>
    </div>
  </div>
</div>

<!-- /.Latest Release Block -->

<!-- SPOTLIGHT-->

<div class="section-spotlight">
<div class="container">
<div class="row">
    <div class="col-lg-6 col-sm-12 col-xs-12 marketplace">
        <h2>Marketplace Spotlight</h2>
        <p>The OpenStack Marketplace is filled with experts working across industries, use cases, and regions to help
        your organization achieve your goals.</p>
        <% if $RandomCompanyService %>
        <% with $RandomCompanyService %>
        <img src="{$Company.BigLogo.Link}" alt="company_logo" class="spotlight-marketplace-logo"/>
        <p class="clamp1 clamp">{$Overview}</p>
        <div class="spotlight-btn-wrapper">
            <a href="{$MarketplaceLink}" class="spotlight-btn">learn more</a>
        </div>
        <% end_with %>
        <% end_if %>
    </div>
    <div class="col-lg-6 col-sm-12 col-xs-12 osf-member">
      <h2>OpenInfra Foundation Member Spotlight</h2>
      <% if $RandomOSFMember %>
      <% with $RandomOSFMember %>
      $Paragraph1
      <% if $Image %>
      <img src="{$Image.Link}" alt="company_logo">
      <% else %>
      <img src="{$Company.BigLogo.Link}" alt="company_logo">
      <% end_if %>
      <p class="clamp2 clamp">
        {$Paragraph2}
      </p>
      <div class="spotlight-btn-wrapper">
          <a href="{$Link}" class="spotlight-btn">learn more</a>
      </div>
      <% end_with %>
      <% end_if %>
    </div>
</div>
</div>
</div>

<!-- /.SPOTLIGHT -->

<!-- User Stories -->

<div class="twros-section">
<div class="container">
<h2>The World Runs on OpenStack</h2>
<p>OpenStack is trusted to manage 40 Million+ cores around the world, across dozens of industries.</p>
<div class="twros-example">
  <% loop UserStories %>
    <div class="twros-row">
      <% if $HomePageImage %>
      <img src="{$HomePageImage.Link}" alt="" class="twros-img"/>
      <% else %>
      <img src="{$Image.Link}" alt="" class="twros-img"/>
      <% end_if %>
      <div class="twros-text">
      <h2>$Name</h2>
      <p>
      $Description
      </p>
      <div class="twros-btn-wrapper">
      <a href="{$Link}" class="twros-btn"><% if $ButtonText %>$ButtonText<% else %>read more<% end_if %></a>
      </div>
      </div>
    </div>
  <% end_loop %>
</div>

</div>
<p><a href="/user-stories">SEE MORE CASE STUDIES &nbsp; <i class="fa fa-arrow-right"></i></a></p>
</div>
</div>

<!-- /.twros-section -->

<!-- Page Content -->

<div class="osf-section">
<div class="container">
<div class="row">
<div class="col-lg-12 col-sm-12" style="text-align: center;">
<a href="https://openinfra.dev" target="_blank"><img src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-dev/OpenInfraFoundation-logo-RGB-horiz2.svg" alt="OpenInfra Foundation Logo" /></a>
<p>OpenStack is a top-level open infrastructure project supported by the <a href="https://openinfra.dev" target="_blank">OpenInfra Foundation</a></p>
</div>
</div>
</div>
</div>

<!-- /.osf-section -->

<script src="themes/openstack/javascript/clamp.min.js"></script>
<script src="themes/openstack/javascript/new-home-page.js"></script>
