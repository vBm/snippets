// ==UserScript==
// @name        FollowShows Subtitles
// @namespace   followshows
// @description Link addic7ed subs
// @author      vBm <vbm@omertabeyond.com>
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://followshows.com/show/*
// @include     http://www.followshows.com/show/*
// @version     1.3
// @date        04/08/2013
// ==/UserScript==


var showInfoName = $('#top-link').find('a:nth-child(2)').text();
var showInfoSeasonDummy = $('#top-link').find('h1').text();
var showInfoSeason = showInfoSeasonDummy.match(/(\d+)/g)[0].replace(/^0+/, "");
var showInfoEpisode = showInfoSeasonDummy.match(/(\d+)/g)[1].replace(/^0+/, "");
var showInfoEpisodeName = $('.episode-title').text();

var subtitlesUrl = 'http://www.addic7ed.com/serie/'+showInfoName+'/'+showInfoSeason+'/'+showInfoEpisode+'/'+showInfoEpisodeName;

$('.buttons').append(
	$('<a>').attr({
		class: 'btn addic7ed',
		style: 'top:24px',
		target: '_blank'
	}).text('Addic7ed subs').click(
		function() { 
			window.open(subtitlesUrl);
			return false;
	})
);
