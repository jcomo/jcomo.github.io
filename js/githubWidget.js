;jQuery(document).ready(function($){

	var vendor = 'jcomo';

	function byUpdated(a, b) {
		return a.pushed_at > b.pushed_at ? -1 : 1;
	}

	$.ajax({
		url: 'https://api.github.com/users/' + vendor + '/repos',
		dataType: 'jsonp',
		success: function(results) {

			// Get the 5 most recent repos
			var data = results.data.sort(byUpdated).slice(0, 5);
			var repoUrl, repoName, date, lastUpdate = 'unknown';

			$.each(data, function(i, item) {
				repoName = item.name;
				repoUrl = item.html_url;
				
				if (item.pushed_at) {
					date = moment(item.pushed_at);
					lastUpdate = date.format("MMMM D");
				}

				$repo = $(
					'<div class="repo">'
					+'<p>'
					+'<a href="' + repoUrl + '">'
					+ repoName
					+'</a>'
					+'</p>'
					+'<time>' + lastUpdate + '</time>'
					+'</div>'
				);

				$('.repos').append($repo);
			});
		}

	});

});