<% if $WebpackDevServer %>
    <script type="text/javascript" src="http://127.0.0.1:3000/production/js/main.js"></script>
<% else %>
	<script type="text/javascript" src="production/js/main.js"></script>
    <link rel="stylesheet" href="production/css/main.css">
<% end_if %>