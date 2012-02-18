#########################################################
# Title      : Omerta Prices
# Name       : omertaPrices.tcl
# Author     : vBm ( vbm@omertabeyond.com )
# Version    : 0.7
#########################################################
# Information:
#	Script has been written for sole purpose
#	of using it at #beyond at Omerta Network.
#	Some of bugs are prolly present, I'll do
#	my best to solve those problems ASAP.
#
#	At the moment only cocaine prices are shown.
#
# Usage      :
#	Usage is rather simple. All you need to do
#	is to define public commands you want to
#	use at your channel.
#########################################################
#
# Versions   :
#	0.1 -    Initial Release
#	0.2 -    Change GMT Offset regardless of timezone
#                 where shell from which this script runs is.
#	0.3 -    Added v3 beta prices
#	0.4 -    Instead of using 'split $prices "\n"' i'm gonna use regexp now
#                  that will give us always correct prices even if there's some errors
#                 on page that displays 'em
#	0.5 -    Removed obsolete beta link
#	0.6 -    Rewritten script totaly to cope with new API
#                 Removed all obsolete version links
#                 added checker for http errors
#	0.7 -    Added back .dm link
#
#########################################################
#
# Configuration :
# Script depends on usage of http and tdom tcl packages

package require http
package require tdom


# Public commands that will trigger the script.
#
# The prefix goes before like '!' or '.'

set cmdprefix "!"


# The suffix comes after like 'prices' or 'p'

set cmdsuffix "p"

# END CONFIG
# SCRIPT START

bind pub - $cmdprefix$cmdsuffix show:prices

proc show:prices { nick host hand chan arg } {
	if { $arg == "" } { set url "http://www.barafranca.com/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".com" }
	if { $arg == "com" } { set url "http://www.barafranca.com/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".com" }
	if { $arg == "dm" } { set url "http://dm.barafranca.com/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".dm" }
	if { $arg == "nl" } { set url "http://www.barafranca.nl/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".nl" }
	if { $arg == "br" } { set url "http://www.barafranca.com.br/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".com.br" }
	if { $arg == "pt" } { set url "http://www.barafranca.com.pt/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".com.pt" }
	if { $arg == "de" } { set url "http://www.barafranca.de/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".de" }
	if { $arg == "fr" } { set url "http://www.barafranca.fr/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".fr" }
	if { $arg == "tr" } { set url "http://www.barafranca.gen.tr/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".gen.tr" }
	if { $arg == "no" } { set url "http://www.barafranca.no/BeO/webroot/index.php?module=API&action=smuggling_prices"; set version ".no" }

	if {[catch {set tok [::http::geturl $url -timeout 10000]} msg]} {
		putlog "oops get:url error:: $msg"
	} else {
		set nrcode [::http::ncode $tok]
	}
	if {$nrcode == "200"} {
		set data [::http::data $tok]
		::http::cleanup $tok
	}
	set dom [dom parse $data]
	set root [$dom documentElement]

	set time [[$root selectNodes /smugglingprices/epochtimestamp/text()] nodeValue]

	set hour [clock format $time -format {%H} -gmt 1]
	set mins [clock format $time -format {%M} -gmt 1]
	if {"$mins" < "30"} { set mins "00" } else { set mins "30" }

	set cokeList [$root selectNodes /smugglingprices/cities/city/prices/cocaine/text()]
	set detroCoke [[lindex $cokeList 0] nodeValue]
	set chiCoke [[lindex $cokeList 1] nodeValue]
	set palermoCoke [[lindex $cokeList 2] nodeValue]
	set nyCoke [[lindex $cokeList 3] nodeValue]
	set lvCoke [[lindex $cokeList 4] nodeValue]
	set phillyCoke [[lindex $cokeList 5] nodeValue]
	set baltiCoke [[lindex $cokeList 6] nodeValue]
	set corleCoke [[lindex $cokeList 7] nodeValue]

	## Cleaning up tdom...
	$dom delete

	set list "$detroCoke $chiCoke $palermoCoke $nyCoke $lvCoke $phillyCoke $baltiCoke $corleCoke"
	set max [lindex [lsort -real $list] end]
	set min [lindex [lsort -real $list] 0]

	foreach item [list detroCoke chiCoke palermoCoke nyCoke lvCoke phillyCoke baltiCoke corleCoke] {
		if { [set $item] == $max } { set $item "\0034\002[set $item]\002\003" }
		if { [set $item] == $min } { set $item "\0033\002[set $item]\002\003" }
	}

	putquick "PRIVMSG $chan : \002$version\002 Coke at\: $hour:$mins OT \| Baltimore\: $baltiCoke \| Chicago\: $chiCoke \| New York\: $nyCoke \| Philadelphia\: $phillyCoke \| Detroit\: $detroCoke \| Las Vegas\: $lvCoke \| Corleone\: $corleCoke \| Palermo\: $palermoCoke"
}