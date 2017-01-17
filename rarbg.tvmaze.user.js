// ==UserScript==
// @name                TVMaze RARBG
// @namespace           tvmaze
// @description         Add RARBG link to TVMaze show page
// @icon                https://tvmazecdn.com/images/favico/favicon.ico
// @author              vBm <vbm@omertabeyond.com>
// @oujs:author         vBm
// @license             The MIT License (MIT)
// @contributionURL     https://www.paypal.me/thevbm/3
// @contributionAmount  €3.00
// @supportURL          https://github.com/vBm/snippets/issues
// @include             http://www.tvmaze.com/shows/*
// @include             https://www.tvmaze.com/shows/*
// @version             0.5
// @date                17/01/2017
// @grant               none
// ==/UserScript==

$.getJSON(
	`//api.tvmaze.com/shows/${$('script:contains(/stats/)').text().match(/\d+/)[0]}`
).done(function(json) {
	$('#main-img').append(
		$('<a>').attr({
			id: 'watching',
			class: 'radius small button secondary rarbg js-needlogin',
			target: '_blank',
		}).css({
			float: 'right',
			width: '100%',
			marginTop: '3px'
		}).text(' RARBG ').click(
			function() {
				window.open(`https://rarbg.to/tv/${json.externals.imdb}/`);
			}
		)
	);
	$('<i class="fa fa-arrow-circle-down"></i>').prependTo('.rarbg');
});
