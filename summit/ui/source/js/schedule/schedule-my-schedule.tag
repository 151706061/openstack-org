<raw>
    this.root.innerHTML = opts.content
</raw>

<schedule-my-schedule>
    <div class="panel panel-default" each="{ key, day in events }">
        <div class="panel-heading">{ key }</div>

        <table class="table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Room</th>
                    <th>RSVP</th>
                </tr>
            </thead>
            <tbody>
                <tr each={ event in day } data-id="{ event.id }">
                    <td style="width: 15%;">{ event.start_time } - { event.end_time }</td>
                    <td style="width: 40%;">
                        <a href="{ base_url+'events/'+ event.id }" target="_blank">{ event.title }</a>
                        <div class="event_description" style="display:none">
                            <raw content="{ event.description }"/>
                        </div>
                    </td>
                    <td style="width: 20%;" if={ should_show_venues == 1 }>{ event.room }</td>
                    <td style="width: 20%;" if={ should_show_venues == 0 }>TBD</td>
                    <td style="width: 10%;">
                        <a href="{ event.rsvp }" if={ event.rsvp != ''}>RSVP</a>
                        <span if={ event.rsvp == '' }> - </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <script>
        this.events             = opts.events;
        this.summit             = opts.summit;
        this.schedule_api       = opts.schedule_api;
        this.dic_events         = opts.dic_events;
        this.should_show_venues = opts.should_show_venues
        this.base_url           = opts.base_url;
        var self                = this;

        this.on('mount', function() {

            $('#show_desc').change(function(){
                $(this).toggleClass('active');
                $('.event_description').toggle();
            });

        });


    </script>

</schedule-my-schedule>