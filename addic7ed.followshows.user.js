// ==UserScript==
// @name        FollowShows Subtitles
// @namespace   followshows
// @description Link addic7ed subs
// @author      vBm <vbm@omertabeyond.com>
// @include     http://followshows.com/show/*
// @include     http://www.followshows.com/show/*
// @version     1
// ==/UserScript==

var showInfo = document.location.href.split('/');
var showInfoName = showInfo[4];
var showInfoDetails = showInfo[6];
var showInfoSeason = showInfoDetails.match(/(\d+)/g)[0].replace(/^0+/, "");
var showInfoEpisode = showInfoDetails.match(/(\d+)/g)[1].replace(/^0+/, "");
var showInfoEpisodeName = document.getElementsByClassName('episode-title')[0].textContent;
var subtitlesUrl = 'http://www.addic7ed.com/serie/'+showInfoName+'/'+showInfoSeason+'/'+showInfoEpisode+'/'+showInfoEpisodeName;

var subsbutton = document.createElement("a");
subsbutton.setAttribute('class', 'btn watch-episode-button addic7ed');
subsbutton.setAttribute('style', 'top:24px');
subsbutton.textContent = 'Addic7ed subs';
subsbutton.addEventListener('click', function() { window.open(subtitlesUrl) });
var showInfoDiv = document.getElementsByClassName('column_2')[0]
showInfoDiv.appendChild(subsbutton);