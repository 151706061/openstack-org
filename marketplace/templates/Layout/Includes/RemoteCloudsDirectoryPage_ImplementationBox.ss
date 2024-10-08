<div class="product-box row" style="border-left-color: #{$Company.CompanyColor}">
    <div class="col-lg-3 col-md-5 col-sm-6">
        <div class="logo-area">
            <span style="background-color: #{$Company.CompanyColor}" class="color-bar"></span>
            <a href="$Link{$Company.URLSegment}/{$Slug}">
                <img alt='{$Company.Name}_small_logo' src='{$Company.Logo().getURL()}' class='small-logo-company company-logo'/>
            </a>
        </div>
    </div>
    <div class="col-lg-8 col-md-7 col-sm-6">
        <div class="company-details-area">
            <h4>
                <a style="color: #{$Company.CompanyColor}" href="$Link{$Company.URLSegment}/{$Slug}">
                    $Name
                </a>
            </h4>
            <p>$Overview</p>
            <% if isOpenStackTested %>
                <div class="tested-listing">
                    <img src="/marketplace/code/ui/frontend/images/openstack-powered.png" alt="OpenStack Powered" width="90">
                    <div class="tested-listing-description">OpenStack Powered</div>
                </div>
            <% end_if %>
            <a style="background-color: #{$Company.CompanyColor}" href="$Link{$Company.URLSegment}/{$Slug}" class="details-button">Details</a>
        </div>
    </div>
</div>