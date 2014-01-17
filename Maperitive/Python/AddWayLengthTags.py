# Adding length tags
# This Python file uses the following encoding: utf-8

from maperipy import *
from maperipy.osm import *
import math
import sys
import string

sFileName = '..\Cache\Forests.osm'

#this function calculates the distance between two nodes
def getLength(node1, node2):
	startx = node1.location.x
	starty = node1.location.y
	endx = node2.location.x
	endy = node2.location.y
	return getLength4(startx, starty, endx, endy)

# This function calculates the distance between two lat/lon pairs
def getLength4(startx, starty, endx, endy):
	midx = (startx+endx)/2
	midy = (starty+endy)/2
	# Earth's circumference is about 40,000 km.
	# So 1 degree of longitude at the equator, or 1 degree of latitude, is about 40,000/360 = 110 km.
	distx = 40000*(endx-startx)/360 * math.cos(math.radians(midy))
	disty = 40000*(endy-starty)/360
	length = math.sqrt(distx*distx+disty*disty)
	return length

# Create an osm file with forest name info
osmFile = open(sFileName, 'w')
iId = 0
# writing osm header
osmFile.write('<?xml version="1.0" encoding="utf-8"?>' + "\n")
osmFile.write('<osm version="0.5" generator="AddWayLengthTags.py">' + "\n")

try:
    # Look at all OSM map sources.
    for layer in Map.layers:
	if layer.layer_type == "OsmLayer":
	    osmLayer = layer.osm

	    #adding length to highways
	    for way in osmLayer.find_ways(lambda x : x.has_tag("highway")):
		if way.nodes[0]!=way.nodes[way.nodes_count-1]:
			    length = getLength(osmLayer.node(way.nodes[0]), osmLayer.node(way.nodes[way.nodes_count-1]))
			    osmLayer.way(way.id).set_tag("length", str(length))

	    # Copy forest names from every multi-polygons to its outer ways
	    for osmRelation in osmLayer.find_relations(lambda x : ( (x.has_tag("landuse", "forest") or x.has_tag("natural", "wood")) and (x.has_tag("name") or x.has_tag("name:he") or x.has_tag("name:en")))):
		for osmMember in osmRelation.members:
		    if osmMember.ref_type==OsmReferenceType.WAY and osmLayer.has_way(osmMember.ref_id):
			osmWay = osmLayer.way(osmMember.ref_id)
			if (osmMember.role=="" or osmMember.role=="outer"):
			    for osmTag in ("name", "name:he", "name:en", "landuse", "natural", "is_in"):
				if (osmRelation.has_tag(osmTag) and not osmWay.has_tag(osmTag)):
				    osmWay.set_tag(osmTag, osmRelation.get_tag(osmTag))

	    # Write Forest label info to the osm file
	    for osmWay in osmLayer.find_ways(lambda x : ( (x.has_tag("landuse") or x.has_tag("natural")) and (x.has_tag("name") or x.has_tag("name:he") or x.has_tag("name:en")))):
		if (osmWay.has_tag("landuse", "forest") or osmWay.has_tag("natural", "wood")):
		    wayBBox= osmLayer.get_way_geometry(osmWay.id).bounding_box
		    # Label placement is de according to the shape's width
		    length = getLength4(wayBBox.min_x, (wayBBox.min_y + wayBBox.max_y), wayBBox.max_x, (wayBBox.min_y + wayBBox.max_y) )
		    osmFile.write('  <node id="' + str(iId) + '" visible="true" lat="' + str((wayBBox.min_y + wayBBox.max_y)/2) + '" lon="' + str((wayBBox.min_x + wayBBox.max_x)/2) + '">' + "\n")
		    for osmTag in ( "landuse", "natural", "name", "name:he", "name:en", "is_in" ):
			if (osmWay.has_tag(osmTag)):
			    try:
				osmFile.write('    <tag k="' + osmTag + '" v="' +  string.replace(osmWay.get_tag(osmTag), '"', '&#34;').encode('utf-8') + '"/>' + "\n")
			    except:
				print ("Error: ", sys.exc_info()[0]," when writing ", osmTag,  "=", osmWay.get_tag(osmTag))
				raise
		    osmFile.write('    <tag k="length" v="' + str(length) + '"/>' + "\n")
		    # Add OSM id for debugging
		    osmFile.write('    <!-- tag k="OSM_id" v="' + str(osmWay.id) + '" -->' + "\n")
		    osmFile.write('  </node>' + "\n")
		    iId = iId + 1
except:
    print "Unexpected error:", sys.exc_info()[0]


# writing osm fotter
osmFile.write('</osm>')
osmFile.close()

# If there are no OSM map sources, report an error...
if osmLayer == None:
    raise AssertionError("There are no OSM map souces.")

# osmLayer.save_xml_file("D:\Tiles\OSM\israel_and_palestine_with_lengths.osm")

# vim: set shiftwidth=4:
