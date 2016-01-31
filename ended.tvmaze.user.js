// ==UserScript==
// @name        TVMaze Ended Shows
// @namespace   tvmaze
// @description Distinguish ended shows on TVMaze with *
// @icon        http://tvmazecdn.com/images/favico/favicon.ico
// @author      vBm <vbm@omertabeyond.com>
// @oujs:author vBm
// @license     The MIT License (MIT)
// @supportURL  https://github.com/vBm/snippets/issues
// @include     http://www.tvmaze.com/watchlist*
// @version     0.1
// @date        31/01/2016
// @grant       none
// ==/UserScript==

$.ajax({
    url: '//' + $(location).attr('hostname') + '/showstatus',
    cache: false,
}).done(function(data) {
    var showNames = [];
    if ($(data).find('[data-title^=Status]').size() !== 0 ) {
        $(data).find('[data-title^=Status]').each(function() {
            if ($(this).text() === 'Ended') {
                showNames.push($(this).parent().find('[data-title^=Show]').text());
            }
        });
        $('H2').each(function() {
            if ($.inArray($(this).text(), showNames) > -1 ) {
                $(this).html('* '+ $(this).html());
            }
        });
    }
});
