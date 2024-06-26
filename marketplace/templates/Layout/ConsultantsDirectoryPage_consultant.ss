<div class="grey-bar">
    <div class="container">
        <div class="back-label">
            <a href="$Top.Link">All Providers</a>
        </div>
    </div>
</div>
<div class="container marketplace-content">
    <div class="row">
        <div class="col-sm-3">
            <% include MarketPlaceCompanyLeftCol %>
            <% include MarketPlaceCustomerCaseStudies %>
        </div>
        <div class="col-sm-9 marketplace-body">
            <% include MarketPlaceCompany %>
            <div class="row">
                <div class="col-lg-6">
                    <div class="info-area">
                        <% if ExpertiseAreas %>
                            <h3 style="color: #{$Company.CompanyColor} !important;">Areas
                                of OpenStack Expertise</h3>
                            <table>
                                <tbody>
                                    <% loop ExpertiseAreas %>
                                    <tr>
                                        <td>$Name</td>
                                        <td>$CodeName</td>
                                    </tr>
                                    <% end_loop %>
                                </tbody>
                            </table>
                        <% end_if %>
                        <% if Services %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">
                                Services Offered</h3>
                            <ul>
                                <% loop Services %>
                                    <li>$Type</li>
                                <% end_loop %>
                            </ul>
                        <% end_if %>
                        <% if PreviousClients %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">Select
                                Clients</h3>
                            <ul>
                                <% loop PreviousClients %>
                                    <li>$Name</li>
                                <% end_loop %>
                            </ul>
                        <% end_if %>
                        <% if ConfigurationManagementExpertises %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">
                                Configuration Management Expertise</h3>
                            <ul>
                                <% loop ConfigurationManagementExpertises %>
                                    <li>$Type</li>
                                <% end_loop %>
                            </ul>
                        <% end_if %>
                        <% if SpokenLanguages %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">
                                Languages</h3>
                            <ul>
                                <% loop SpokenLanguages %>
                                    <li>$Name</li>
                                <% end_loop %>
                            </ul>
                        <% end_if %>
                        <% if Regions %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">Regions
                                with local offices</h3>
                            <ul>
                                <% loop Regions %>
                                    <li>$Name</li>
                                <% end_loop %>
                            </ul>
                        <% end_if %>
                        <% if Offices %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">
                                Offices</h3>
                            <script type="text/javascript">
                                    <% if IsDraft  %>
                                    var offices_instance = $Top.CurrentOfficesLocationsDraftJson;
                                    <% else %>
                                    var offices_instance = $Top.CurrentOfficesLocationsJson;
                                    <% end_if %>
                            </script>
                            <div style="width: 300px; height: 200px; position: relative;"
                                 id="mini-map" tabindex="0">
                            </div>
                            <p>
                                Click any map pin to see office address
                            </p>
                        <% end_if %>
                        <% if RegionalSupports %>
                            <hr>
                            <h3 style="color: #{$Company.CompanyColor} !important;">Regions
                                where support is offered</h3>
                            <table class="regions">
                                <tbody>
                                    <% loop RegionalSupports %>
                                    <tr>
                                        <% loop Region %>
                                            <td>$Name</td>
                                        <% end_loop %>
                                    </tr>
                                    <% end_loop %>
                                </tbody>
                            </table>
                        <% end_if %>
                    </div>
                </div>
                <div class="col-lg-6">
                    <% if IsPreview  %>
                        <% include MarketPlaceReviews_Placeholder %>
                    <% else %>
                        <% include MarketPlaceReviews %>
                    <% end_if %>
                    <% if Videos %>
                        <div id="videos">
                            <% loop Videos %>
                                <h3 style="color: #{$Top.Company.CompanyColor} !important;"
                                    class="video-title">$Name<span
                                        class="video-duration">($FormattedLength)</span>
                                </h3>
                                <iframe frameborder="0" width="250" height="200"
                                        allowfullscreen=""
                                        src="//www.youtube.com/embed/{$YouTubeId}?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;controls=2">
                                </iframe>
                            <% end_loop %>
                        </div>
                    <% end_if %>

                    <% if Resources %>
                        <div id="more-resources">
                            <h3 style="color: #{$Company.CompanyColor} !important;">More
                                Resources</h3>
                            <ul>
                                <% loop Resources %>
                                    <li><a href="{$Uri}"
                                           style="color: #{$Company.CompanyColor} !important;"
                                           class="outbound-link" target="_blank">$Name</a>
                                    </li>
                                <% end_loop %>
                            </ul>
                        </div>
                    <% end_if %>

                </div>
            </div>
        </div>
    </div>
</div>