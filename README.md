#Israel Hiking Map
Create Israel Hiking Map similar to Israel Trails Committee (ITC)




###Abstract
* Maperitive: The first part of following manual will explain how to create an Israel hiking style map (256x256 PNG tiles).
Note that this might be tricky on PCs that has windows 32bit and 4GB RAM (I managed to do it but i had to close all other running applications).
*

##Maperitive

Maperitive runs on Windows, Linux and MAC.

1. Download [Maperitive](http://maperitive.net/) and extract it to a desired location.
    On Linux and MacOS, Maperitive requires the use of [Mono](http://www.mono-project.com/Main_Page).
2. Go to [Israel Hiking on GitHub](https://github.com/HarelM/IsraelHiking/) (this site if you read this file in github).
    * click on the Files tab.
    * click on the Zip with the cloud and arrow to download all the files.
3. The zip file will contain some unnecessary folders and files, the only folder needed from this zip is called Maperitive, copy it to the Maperitive installation folder.
    * The folder in the zip file are a subset of the folders exist in Maperitive installation folder. when copying some file might be duplicate, it is OK to overwrite them.
4. Download [OSM Data for the region](http://download.geofabrik.de/asia/israel-and-palestine-latest.osm.pbf) and place it in the Cache folder.
5. Open Maperitive program, click _File &rarr; Run Script_ ... and choose _Scripts\IsraelHiking.mscript_

This should generate 256x256 png tile files inside Tiles directory and should take long (about 3 hours or more, I prefer to do it overnight, but you need to make sure you don't get out of memory).


-------------------------
Created by Harel Mazor and Zeev Stadler 31.3.13. Updated by Yoav Rofe 11/4/14
