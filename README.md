#Israel Hiking Map
Create Israel Hiking Map similar to Israel Trails Committee (ITC)


The output of the map can be [seen here](http://osm.org.il/IsraelHiking/IsraelHikingMap.html).

###Ready-to-use maps

Ready-to-use maps are available for:
* [OruxMaps](http://www.oruxmaps.com/index_en.html): 
    * Download the ["Israel Hiking" folder](https://googledrive.com/host/0B-qrsEBJWXhQUGVBM3lHZTF2eXc/) with both files in it.
    * Place the directory under the oruxmaps/mapfiles directory on your device.
    * Re-generate the maps database using _"Maps &rarr; Switch map &rarr; offline &rarr; Refresh (the counter-clockwise arrow)"_
* [OziExplorer](http://www.oziexplorer.com/): _Based on [this thread](http://www.jeepolog.com/forums/showthread.php?t=74909&p=508197)._
    * Download [the 6 files here](https://www.dropbox.com/sh/h8ye52ahotghta1/tTeUkbTspw).
    * Place them in the _MAPS_ sub-directory of the OziExplorer installation.
    * Re-index the maps using _"MAP &rarr; Re-Index map files"_. 
* [OpenMaps for iOS](http://izeize.com/openmaps/) (this is a guess since I don't have an iOS device)
    * Select new type of map
    * define a name for it (i.e IsraelHiking)
    * enter the this URL: 
```
    http://osm.org.il/IsraelHiking/Tiles/<zoom>/<x>/<y>.png
```


###Abstract
* Maperitive: The first part of following manual will explain how to create an Israel hiking style map (256x256 PNG tiles).
Note that this might be tricky on PCs that has windows 32bit and 4GB RAM (I managed to do it but i had to close all other running applications).
* MOBAC: The second part of the following manual will explain how to convert the map for offline use on an android device.


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

##MOBAC and Oruxmaps

[MOBAC - MOBile Atlas Creator](http://mobac.sourceforge.net/) is a JAVA program that runs on Windows, Linux, MAC, and more. It creates offline maps for [http://mobac.sourceforge.net/#features](many navigation applications).
Oruxmaps is an offline and online navigation application for Android.
MOBAC is creating Oruxmaps offline maps from the Maperitive results.

1. In order to use an offline version of this map in an android device first install [Oruxmaps](http://www.oruxmaps.com/index_en.html) from the [play store](https://play.google.com/store/apps/details?id=com.orux.oruxmaps). Oruxmaps is free of charge and does not have ads. It was not created by any of us, yet we recommend you buy the [donate version](https://play.google.com/store/apps/details?id=com.orux.oruxmapsDonate).
2. Download [MOBAC - MOBile Atlas Creator](http://mobac.sourceforge.net/).
3. Open IsraelHiking.xml file and change the \<sourceFolder\> tag to where the tiles were created (.../{Maperitive Install folder}/Tiles - full path).
4. Place the _"IsraelHiking.xml"_ file in the _"{MOBAC installtion folder}/mapsources/"_ folder
5. Open MOBAC (it takes some time since it runs on java) and choose _"oruxmaps sqlite"_ as the atlas format.
6. On the left side under _"Map Source"_ choose _"Isreal Hiking"_.
7. Move zoom on the top of the screen to 7 and by mouse drag select the whole country (the selected area should be red)
   * Alternatively, you can select the required area using a polygon and avoid spending disk space for the Mediterranean Sea and foreign countries.
8. Under _"Zoom levels"_ check 7,8,..,15
9. Click _"Settings"_. Choose _"Map size"_ tab and change the Maximum size of rectangular maps to 1048575.
10. Under _"Atlas Content"_ set name to _"Israel Hiking"_ and click on _"Add Selection"_.
    this should result in adding the name to the tree, opening the tree should show the selected zoom levels (7 - 15).
11. Click _"Create Atlas"_.
12. A window should pop up with progress, make sure to check "ignore download errors", the operation should take about 20 Minutes.
13. Once finished you should be able to find an _"Israel Hiking"_ folder under _"{MOBAC installation folder}/atlases/Israel Hiking/{Creation Date}"_.
14. Copy the inner _"Israel Hiking"_ folder (not _"Israel Hiking/{Creation Date}"_) to your android device under oruxmaps/mapfiles
15. Enjoy, open a OSM account and add trails to make this map better :-)


-------------------------
Created by Harel Mazor and Zeev Stadler 31.3.13. Last Updated: 15.10.13
