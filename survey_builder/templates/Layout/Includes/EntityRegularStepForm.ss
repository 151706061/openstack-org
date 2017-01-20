    <form $AttributesHTML>
    <fieldset>
        <div class="row">
            <div class="col-md-12">
                <p><span class="entity-survey-title-details"><%t EntityRegularStepForm.EntityDetailTitle "Deployment details" %>&nbsp;-</span>&nbsp;<%t EntityRegularStepForm.StepCountTitle "Step {current} of {max}" current=$CurrentStepIndex max=$MaxStepIndex %></p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-3 created-by">Created&nbsp;by&nbsp;<strong>{$Survey.createdBy.Email}</strong></div>
            <div class="col-md-3 edited-by"><span class="team-separator">&#124;&nbsp;Edited&nbsp;by&nbsp</span><strong>{$Survey.EditedBy.Email}</strong></div>
            <div class="col-md-6 teams-container"><% if AllowTeams %><span class="team-separator">&#124;&nbsp;</span><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;<a class="add-team-member-btn" href="#" title="<%t EntityRegularStepForm.AddTeamMemberTitle "Add another team member" %>"><%t EntityRegularStepForm.AddTeamMemberTitle "Add another team member" %></a><% end_if %></div>
        </div>
        <hr>
        <% loop $Fields %>
            $FieldHolder
        <% end_loop %>
        <div class="clear"><!-- --></div>
    </fieldset>
    <% if $Actions %>
            <div class="Actions">
                <% loop $Actions %>
                    $Field
                <% end_loop %>
            </div>
    <% end_if %>
    </form>
    <% include EntitySurvey_TeamModal Survey=$Survey %>