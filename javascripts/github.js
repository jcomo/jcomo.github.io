$(function() {
  function showGithubRepos(repos, user) {
    var $repos = $('#repos');
    var content = '';
    var updated = '';
    var reposHtml = repos.map(function(repo) {
      updated = moment(repo.updated_at).fromNow();
      content = '<li class="repo">'
                + '<span class="post-date">' + updated + '</span>'
                + '<a href="' + repo.html_url + '">' + repo.name + '</a>'
                + '</li>';
      return content;
    });
    $repos.html(reposHtml.join(''));
  }

  function getGithubRepos(user, count) {
    var count = parseInt(count, 5) || 5;
    $.ajax({
      url: 'https://api.github.com/users/' + user + '/repos',
      success: function(data) {
        var sortedRepos = data.sort(function(a, b) {
          return new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1;
        }).slice(0, count);
        showGithubRepos(sortedRepos, user);
      },
      error: function(err) {
        $('#github .loading').addClass('error').text('Could not connect to Github');
      }
    })
  }

  getGithubRepos('jcomo');
});