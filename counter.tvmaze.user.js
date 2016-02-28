// ==UserScript==
// @name        TVMaze Counter
// @namespace   tvmaze
// @description Display how many episodes are left to watch
// @icon        http://tvmazecdn.com/images/favico/favicon.ico
// @author      vBm <vbm@omertabeyond.com>
// @oujs:author vBm
// @license     The MIT License (MIT)
// @supportURL  https://github.com/vBm/snippets/issues
// @include     http://www.tvmaze.com/watchlist*
// @version     0.1
// @date        29/02/2016
// @grant       none
// ==/UserScript==

var totalEpisodesSum, totalEpisodes = [];
var totalShows = $('.watched-eps').length + 1;

$('.watched-eps').each(function() {
	totalEpisodes.push(
		$(this).text().trim().split('/').map(function (el) {
			return +el;
		}).reverse().reduce(function (a, b) {
			return a - b;
		})
	);
});

totalEpisodesSum = totalEpisodes.reduce(function (a, b) {
	return a + b;
});

$('#filter.row').append(
	$('<div>').append(
		$('<span>').attr({
			class: 'center large3 column'
		}).text('Remaining episodes to watch: ' + totalEpisodesSum + ' from ' + totalShows + ' shows')
	)
);