;get process info about ram and virtual memory usage
;/getproc <process name>
;don't add .exe next to process name

; $wmiget comes from http://www.mircscripts.org/showdoc.php?type=code&id=3218

alias wmiget {
  var %com = cominfo, %com2 = cominfo2, %com3 = cominfo3
  if ($com(%com)) { .comclose %com }
  if ($com(%com2)) { .comclose %com2 }
  if ($com(%com3)) { .comclose %com3 }
  .comopen %com WbemScripting.SWbemLocator
  var %x = $com(%com,ConnectServer,3,dispatch* %com2), %x = $com(%com2,ExecQuery,3,bstr*,select $prop from $1,dispatch* %com3), %x = $comval(%com3,$iif($2,$2,1),$prop)
  if ($com(%com)) { .comclose %com }
  if ($com(%com2)) { .comclose %com2 }
  if ($com(%com3)) { .comclose %com3 }
  return %x
}

alias getproc { say OS: $chr(91) $+ $wmiget(Win32_OperatingSystem).Caption $+ $chr(93) Running processes: $chr(91) $+ $wmiget(Win32_OperatingSystem).NumberOfProcesses $+ $chr(93) Process Name: $chr(91) $+ $wmiget(win32_process where (description=" $+ $1 $+ .exe")).description $+ $chr(93) PID: $chr(91) $+ $wmiget(win32_process where (description=" $+ $1 $+ .exe")).ProcessId $+ $chr(93) Mem Usage: $chr(91) $+ $bytes($wmiget(win32_process where (description=" $+ $1 $+ .exe")).WorkingSetSize,m).suf $+ $chr(93) VM Size: $chr(91) $+ $bytes($wmiget(win32_process where (description=" $+ $1 $+ .exe")).VirtualSize,m).suf $+ $chr(93) VM Peak: $chr(91) $+ $bytes($wmiget(win32_process where (description=" $+ $1 $+ .exe")).PeakVirtualSize,m).suf $+ $chr(93) }

menu status,channel,nicklist,query {
  -
  Process Info
  .getProc:/getproc $$?=""
  -
}