// ==UserScript==
// @name                TVMaze Counter
// @namespace           tvmaze
// @description         Display how many episodes are left to watch
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
// @date                01/01/2024
// @grant               none
// ==/UserScript==

const totalEpisodes = Array.from(document.querySelectorAll('.watched-eps')).map(element => {
	return element.textContent.trim().split('/').map(element => +element).reverse().reduce((a, b) => a - b);
});

const totalEpisodesSum = totalEpisodes.reduce((a, b) => a + b, 0);

localStorage.setItem('totalEps', totalEpisodesSum);

const filterElement = document.getElementById('filter');
const remainingSpan = document.createElement('span');
remainingSpan.classList.add('grid-x', 'grid-margin-x', 'align-center');
remainingSpan.id = 'remaining';
remainingSpan.textContent = `Remaining episodes to watch: ${localStorage.totalEps} from ${document.querySelectorAll('.watched-eps').length} shows`;

filterElement.appendChild(document.createElement('div').appendChild(remainingSpan));

document.querySelector('.watch-dropdown').addEventListener('change', (event) => {
	if (event.target.value === '0') {
		localStorage.setItem('totalEps', localStorage.totalEps - 1);
		remainingSpan.textContent = `Remaining episodes to watch: ${localStorage.totalEps} from ${document.querySelectorAll('.watched-eps').length} shows`;
	}
});
