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

			$.each(data, function(i, repo) {
				repoName = repo.name;
				repoUrl = repo.html_url;
				
				if (repo.pushed_at) {
					date = moment(repo.pushed_at);
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
		},

		error: function(req, status, err) {
			$error = '<p>Could not connect to GitHub.</p>';
			$('.repos').append($error);
		}

	});

});