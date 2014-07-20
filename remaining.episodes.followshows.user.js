// ==UserScript==
// @name        FollowShows Remaining
// @namespace   followshows
// @description Show a number of remaining episodes to watch
// @author      vBm <vbm@omertabeyond.com>
// @oujs:author vBm
// @include     http://followshows.com/user/*
// @version     1
// @date        20/07/2014
// @grant       none
// ==/UserScript==

$('#stats').append(
	$('<div>').append(
		$('<span>').attr({
			class: 'addic7ed'
		}),
		$('<div>').attr({
			class: 'title'
		}).text('EPISODES TO WATCH')
	)
);

$.ajax({
	url: "http://followshows.com/home/watchlist",
	cache: false,
}).done(function(data) {
	var totalEpisodes = [];
	$(data).find('.stats').each(function() {
		totalEpisodes.push($(this).text().match(/\d+/)[0])
	});
	var totalEpisodesSum = eval(totalEpisodes.join('+'));
	$('.addic7ed').text(totalEpisodesSum);
});
