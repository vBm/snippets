// ==UserScript==
// @name                TVMaze Counter
// @namespace           tvmaze
// @description         Display how many episodes are left to watch
// @icon                https://tvmazecdn.com/images/favico/favicon.ico
// @author              vBm <vbm@omertabeyond.com>
// @oujs:author         vBm
// @license             The MIT License (MIT)
// @contributionURL     https://www.paypal.me/thevbm/3
// @contributionAmount  €3.00
// @supportURL          https://github.com/vBm/snippets/issues
// @include             http://www.tvmaze.com/watchlist*
// @include             https://www.tvmaze.com/watchlist*
// @version             0.5
// @date                25/12/2017
// @grant               none
// ==/UserScript==

var totalEpisodesSum, totalEpisodes = [];

$('.watched-eps').each(function() {
	totalEpisodes.push(
		$(this).text().trim().split('/').map(el => +el).reverse().reduce((a, b) => a - b)
	);
});

totalEpisodesSum = totalEpisodes.reduce((a, b) => a + b);

localStorage.setItem('totalEps', totalEpisodesSum);

$('#filter').append(
	$('<div>').append(
		$('<span>').attr({
			class: 'grid-x grid-margin-x align-center',
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
