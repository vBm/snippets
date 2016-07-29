// ==UserScript==
// @name        TVMaze RARBG
// @namespace   tvmaze
// @description add rarbg link to tvmaze show page
// @icon        http://tvmazecdn.com/images/favico/favicon.ico
// @author      vBm <vbm@omertabeyond.com>
// @oujs:author vBm
// @license     The MIT License (MIT)
// @supportURL  https://github.com/vBm/snippets/issues
// @include     http://www.tvmaze.com/shows/*
// @version     0.4
// @date        29/07/2016
// @grant       none
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
