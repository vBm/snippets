// ==UserScript==
// @name        FollowShows Remaining
// @namespace   followshows
// @description Show a number of remaining episodes to watch
// @icon        http://followshows.com/favicon.ico
// @author      vBm <vbm@omertabeyond.com>
// @oujs:author vBm
// @include     http://followshows.com/user/*
// @version     2
// @date        22/07/2014
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
	var totalEpisodesSum, totalEpisodes = [];
	if ($(data).find('.stats').size() !== 0 ) {
		$(data).find('.stats').each(function() {
			totalEpisodes.push(parseInt($(this).text().match(/\d+/)[0], 10));
		});
		totalEpisodesSum = totalEpisodes.reduce(function(a, b) {
			return a + b;
		});
		$('.addic7ed').text(totalEpisodesSum);
	} else {
		$('.addic7ed').text('N/A');
	}
});
