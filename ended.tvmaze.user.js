// ==UserScript==
// @name                TVMaze Ended Shows
// @namespace           tvmaze
// @description         Distinguish ended shows on TVMaze with *
// @icon                https://tvmazecdn.com/images/favico/favicon.ico
// @author              vBm <the.vbm@gmail.com>
// @oujs:author         vBm
// @license             The MIT License (MIT)
// @contributionURL     https://www.paypal.me/thevbm/3
// @contributionAmount  €3.00
// @supportURL          https://github.com/vBm/snippets/issues
// @match               http://www.tvmaze.com/watchlist*
// @match               https://www.tvmaze.com/watchlist*
// @version             0.6
// @grant               none
// ==/UserScript==

(async () => {
    try {
        const response = await fetch('/showstatus', { cache: 'no-store' });
        const data = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');


        const ended = [];
        const tbd = [];

        const statusElements = Array.from(html.querySelectorAll('[data-title^=Status]'));

        if (statusElements.length !== 0) {
            statusElements.forEach(statusElement => {
                const showTitleElement = statusElement.parentElement.querySelector('[data-title^=Show]');
                const showTitle = showTitleElement.textContent;

                if (statusElement.textContent === 'Ended') {
                    ended.push(showTitle);
                } else if (statusElement.textContent === 'To Be Determined') {
                    tbd.push(showTitle);
                }
            });

            Array.from(document.querySelectorAll('H2')).forEach(titleElement => {
                const titleText = titleElement.textContent;

                if (ended.includes(titleText)) {
                    titleElement.innerHTML = `* ${titleElement.innerHTML}`;
                } else if (tbd.includes(titleText)) {
                    titleElement.innerHTML = `?!? ${titleElement.innerHTML}`;
                }
            });
        }
    } catch (error) {
        console.error('Error fetching show status:', error);
    }
})();
