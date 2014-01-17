from maperipy import App
import time

App.log('script-dir: ' + App.script_dir)
App.run_command('change-dir dir="' + App.script_dir + '\.."')
#App.run_command("run-script file=Scripts\IsraelHiking.mscript")
# Map Created
App.log('change-dir dir="..\Site"')
App.run_command('change-dir dir="..\Site"')
App.run_command("generate-tiles minzoom=7 maxzoom=7 use-fprint=true")
App.log("=== Create a Zip file with new tiles ===")
App.run_command('zip zip-file="TileUpdate.zip"')

# Create LastModified.js file and add it to zip file
jsFile = open('..\Site\js\LastModified.js', 'w')
jsFile.write("function getLastModifiedDate() { return '" + time.strftime("%d-%m-%Y") + "'; }")
jsFile.close()

App.log("=== Start uploading of tiles zoom 15 and below ===")
App.log('App.start_program(' + App.script_dir + '\..\..\Site\UploadTiles.bat")')
App.start_program(App.script_dir + '\..\..\Site\UploadTiles.bat"', ["TileUpdate.zip"])
App.log("=== Start creation of Oruxmap map ===")
App.log('App.start_program(App.script_dir + "\..\..\Mobile Atlas Creator\CreateIsraelHiking.bat", [])')
App.start_program(App.script_dir + "\..\..\Mobile Atlas Creator\CreateIsraelHiking.bat", [])
App.log("=== Create tiles for zoom 16 ===")
App.log('script-dir: ' + App.script_dir + '\..\..\Site')
App.run_command("generate-tiles minzoom=16 maxzoom=16 use-fprint=true")
App.log("=== Create a Zip file with new tiles ===")
App.run_command('zip zip-file="TileUpdate16.zip"')
App.log("=== Start uploading of tiles zoom 16 ===")
App.start_program(App.script_dir + '\..\..\Site\UploadTiles.bat"', ["TileUpdate16.zip"])
App.run_command('change-dir dir="' + App.script_dir + '\.."')
