// ==UserScript==
// @name                TVMaze Torrent
// @namespace           tvmaze
// @description         Add Torrent links to TVMaze show page
// @icon                https://tvmazecdn.com/images/favico/favicon.ico
// @author              vBm <vbm@omertabeyond.com>
// @oujs:author         vBm
// @license             The MIT License (MIT)
// @contributionURL     https://www.paypal.me/thevbm/3
// @contributionAmount  €3.00
// @supportURL          https://github.com/vBm/snippets/issues
// @match               http://www.tvmaze.com/shows/*
// @match               https://www.tvmaze.com/shows/*
// @version             0.9.0
// @date                09/24/2022
// @grant               none
// ==/UserScript==

async function getShows() {
    const response = await fetch(`//api.tvmaze.com/shows/${$('script:contains(/stats/)').text().match(/\d+/)[0]}`);
    const data = await response.json();

    $('#main-img').append(
        $('<div>').attr({
            id: 'following',
            class: 'radius small button secondary js-needlogin'
        }).append(
            $('<span>').attr({
                class: 'torrent',
                target: '_blank',
            }).text(' RARBG ').click(
                () => {
                    window.open(`https://rarbg.to/tv/${data.externals.imdb}/`);
                }
            ).prepend(
                $('<i class="fa fa-arrow-circle-down"></i>')
            )
        ).append(
            $('<span>').attr({
                class: 'torrent',
                target: '_blank',
            }).text(' TL ').click(
                () => {
                    window.open(`https://www.torrentleech.org/torrents/browse/index/imdbID/${data.externals.imdb}/`);
                }
            ).prepend(
                $('<i class="fa fa-arrow-circle-down"></i>')
            )
        )
    );

    $('.torrent').css({
        display: 'inline-block',
        width: '33.33%',
        marginTop: '3px',
    }).hover(function() {
        $(this).css({
            backgroundColor: '#43ac6a'
        });
    }, function() {
        $(this).css({
            backgroundColor: ''
        });
    });
}

await getShows();
