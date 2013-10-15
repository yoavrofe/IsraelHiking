SET ZIPFILE="%~nx1"

IF %ZIPFILE%=="" SET ZIPFILE=TileUpdate.zip
%~d0
cd %~dp0
"%~dp0\..\..\WinSCP\WinSCP.com" /command "open ""Upload-osm.org.il""" "option reconnect 15" "option batch abort" "put -resume -preservetime -transfer=binary ""%ZIPFILE%""" "exit" 
REM unzip
"%~dp0\..\..\PuTTY\plink.exe" osm.org.il unzip -d ~/public_html/Israel\ Hiking/Tiles -o ~/temp/%ZIPFILE%
"%~dp0\..\..\PuTTY\plink.exe" osm.org.il rm ~/temp/%ZIPFILE%
