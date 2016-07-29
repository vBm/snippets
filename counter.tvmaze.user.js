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
// @version     0.3
// @date        29/07/2016
// @grant       none
// ==/UserScript==

var totalEpisodesSum, totalEpisodes = [];

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

localStorage.setItem('totalEps', totalEpisodesSum);

$('#filter.row').append(
	$('<div>').append(
		$('<span>').attr({
			class: 'center large3 column',
			id: 'remaining'
		}).text(`Remaining episodes to watch: ${localStorage.totalEps} from ${$('.watched-eps').length} shows`)
	)
);

$('.watch-dropdown').change(function(){
	if ($(this).val() === '0') {
		localStorage.setItem('totalEps', (localStorage.totalEps - 1));
		$('#remaining').text(`Remaining episodes to watch: ${localStorage.totalEps} from ${$('.watched-eps').length} shows`);
	}
});
