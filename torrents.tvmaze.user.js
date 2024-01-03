// ==UserScript==
// @name                TVMaze Torrent
// @namespace           tvmaze
// @description         Add Torrent links to TVMaze show page
// @icon                https://tvmazecdn.com/images/favico/favicon.ico
// @author              vBm <the.vbm@gmail.com>
// @oujs:author         vBm
// @license             MIT
// @contributionURL     https://www.paypal.me/thevbm/3
// @contributionAmount  €3.00
// @supportURL          https://github.com/vBm/snippets/issues
// @match               http://www.tvmaze.com/shows/*
// @match               https://www.tvmaze.com/shows/*
// @version             1.1.0
// @date                01/01/2024
// @grant               none
// ==/UserScript==

(async () => {
    const processActiveListItem = async () => {
        const activeListItem = document.querySelector('li.active');

        if (!activeListItem) {
            console.error('No list item with the "active" class found');
            return null;
        }

        const href = activeListItem.querySelector('a').getAttribute('href');
        const match = href.match(/\/shows\/(\d+)\/.*/);

        if (match) {
            return match[1];
        } else {
            console.error('Unable to extract show ID');
            return null;
        }
    };

    const fetchShowData = async () => {
        const showId = await processActiveListItem();

        if (showId === null) {
            console.error('Unable to fetch show data');
            return null;
        }

        const response = await fetch(`//api.tvmaze.com/shows/${showId}`);
        const { externals } = await response.json();
        return externals;
    };

    const { imdb } = await fetchShowData();

    const mainImg = document.getElementById('main-img');
    const followingDiv = document.createElement('div');
    followingDiv.id = 'following';
    followingDiv.className = 'radius small button secondary js-needlogin';

    const openTorrentLink = (url) => window.open(url);

    const createTorrentLink = (spanText, siteUrl) => {
        const torrentSpan = document.createElement('span');
        torrentSpan.className = 'torrent';
        torrentSpan.textContent = spanText;
        torrentSpan.target = '_blank';
        torrentSpan.addEventListener('click', () => openTorrentLink(siteUrl));

        const arrowIcon = document.createElement('i');
        arrowIcon.className = 'fa fa-arrow-circle-down';
        torrentSpan.prepend(arrowIcon);

        return torrentSpan;
    };

    followingDiv.appendChild(createTorrentLink(' TL ', `https://www.torrentleech.org/torrents/browse/index/imdbID/${imdb}/`));
    followingDiv.appendChild(createTorrentLink(' BTN ', `https://broadcasthe.net/torrents.php?action=advanced&imdb=${imdb}/`));

    mainImg.appendChild(followingDiv);

    const torrentLinks = document.querySelectorAll('.torrent');
    torrentLinks.forEach((link) => {
        link.style.display = 'inline-block';
        link.style.width = '50%';

        link.addEventListener('mouseover', () => link.classList.add('hovered'));
        link.addEventListener('mouseout', () => link.classList.remove('hovered'));
    });
})();
