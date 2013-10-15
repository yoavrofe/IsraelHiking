// globals:
var language;

jQuery(document).ready(function($) {
    language = "en";
    onChangeLanguage();

    var zoom = parseInt(getURLParameter('zoom'));
    var lat = parseFloat(getURLParameter('lat'));
    var lng = parseFloat(getURLParameter('lng'));
    if (zoom !== null && lng !== null && lat !== null)
    {
        map.setView([lat, lng], zoom);
    }
    else
    {
        map.setView([31.773, 35.12], 10);
    }
});

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function onSubmit() {
    var strSearchTerm = $('#SearchText')[0].value;
    if (isIE() !== false)
    {
        showAlert("This feature is not supported in this browser...");
        return false;
    }
    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + encodeURIComponent(strSearchTerm), function(data) {
        var items = [];
        $.each(data, function(key, val) {
            // HM Todo - check value the it is within israel bounds
            // HM Todo - make ie 8 work with nominatim...?
            items.push(
                    '<li><a href="" onclick="onSearchResults(' +
                    val.lat + ', ' + val.lon + ');return false;">' + val.display_name +
                    '</a></li>'
                    );
        });
        if (items.length !== 0) {
            showAlert("<ul>" + items.join('') + "</ul>");
            return false;
        }
        showAlert("No results found");
        return false;
    });
    return false;
}

function hidePopovers() {
    $("#SearchText").popover('hide');
}

function showAlert(message) {
    $("#SearchText").attr('data-content', message);
    $("#SearchText").popover('show');
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function onChangeLanguage() {
    hidePopovers();
    $("#About div").remove();
    var text = "";
    if (language === "he")
    {
        text = getHebrewText();
        $("#LegendText").text('מקרא');
        $("#AboutText").text('אודות');
        $("#EditText").text('ערוך');
        $("#PermalinkText").text('קישור');
        $("#SearchText").attr('placeholder', 'חפש');
        $("#LegendImage").attr("src", "assets/legend-heb.png");
        $("#Flag").attr("src", "assets/English.png");
        cssLink.href = "css/bootstrap.rtl.css";
        language = "en";
    }
    else if (language === "en")
    {
        text = getEnglishText();
        $("#LegendText").text('Legend');
        $("#AboutText").text('About');
        $("#EditText").text('Edit');
        $("#PermalinkText").text('Permalink');
        $("#SearchText").attr('placeholder', 'Search');
        $("#LegendImage").attr("src", "assets/legend-en.png");
        $("#Flag").attr("src", "assets/Hebrew.png");
        cssLink.href = "css/bootstrap.ltr.css";
        language = "he";
    }
    $("#About").append(text);
    getLinks();
}

function getHebrewText() {
    var text = '<div class="container">' +
            '<h1>פרוייקט מפת הטיולים הפתוחה של ישראל</h1>' +
            '<p> המפה הזו נוצרה בעזרת מידע מ- <a class="OSM" href="http://www.openstreetmap.org/" target="_blank">Open Street Map</a> שם ניתן לראות ולערוך אותו. כל שיש לעשות הוא לפתוח חשבון ולהתחיל למפות. שימו לב, המפה אינה מתעדכנת באופן מיידי.</p>' +
            '<h4> להלן כמה קישורים הקשורים לפרוייקט </h4>' +
            '<ul>' +
            '<li><a class="Github">Github</a> הוראות איך ליצור את המפה בעצמך וקישורים להורדת מפות</li>' +
            '<li><a class="OSMWiki">Israel OSM Wiki Project</a> חוקים נפוצים של קהילת הממפים הישראלית של OSM</li>' +
            '<li><a class="OSMForum">Israel OSM Forum</a> היכן שניתן למצוא תשובות ולשאול שאלות לגבי המיפוי</li>' +
            '</ul>' +
            '<i>' +
            '<p align="left">' +
            'תודה על תרומתכם!<br>' +
            'הראל וזאב<br>' +
            '</p>' +
            '</i>' +
            '</div>';
    return text;
}

function getEnglishText() {
    var text = '<div class="container">' +
            '<h1>Israel Hiking Project</h1>' +
            '<p> This map was generated from <a class="OSM">Open Street Map (OSM)</a> data where it can be be viewed and edited. All you need to do is create an account and start mapping. Note that the changes will not affect this map instantly.</p>' +
            '<h4> Below are some links related to this project </h4>' +
            '<ul>' +
            '<li>See <a class="Github">Github</a> for instructions on how to create the map by yourself and links to map downloads.</li>' +
            '<li>See <a class="OSMWiki">Israel OSM Wiki Project</a> for common rules of the Israeli Open Street Map community.</li>' +
            '<li>See <a class="OSMForum">Israel OSM Forum</a> for the Israeli Open Street Map forum where you can post questions and look for answers.</li>' +
            '</ul>' +
            '<i>' +
            '<p align="right">' +
            'Thank you for your support!<br>' +
            'Harel and Zeev<br>' +
            '</p>' +
            '</i></div>';
    return text;
}

function onEdit() {
    hidePopovers();
    var lat = map.getCenter().lat;
    var lng = map.getCenter().lng;
    var zoom = map.getZoom();
    window.open("http://www.openstreetmap.org/edit#map=" + zoom + "/" + lat + "/" + lng, '_blank');
}

function onPermalink() {
    var address = window.location.href.match(/^[^\#\?]+/)[0] + "?zoom=" + map.getZoom() + "?lat=" + map.getCenter().lat + "?lng=" + map.getCenter().lng;
    $("#Permalink").empty();
    $("#Permalink").append('<div class="container"><a href="' + address + '">' + address + '</a></div>');
    hidePopovers();
}

function onSearchResults(lat, lng) {
    hidePopovers();
    var location = new L.LatLng(lat, lng);
    map.panTo(location);
    map.setZoom(15);
}

function getLinks() {
    var links = $(".OSM");
    for (var i = 0; i < links.length; ++i) {
        links[i].href = "http://www.openstreetmap.org/";
        links[i].target = "_blank";
    }
    links = $(".Github");
    for (var i = 0; i < links.length; ++i) {
        links[i].href = "https://github.com/HarelM/maperitive-rulesets/tree/master/IsraelHiking#israel-hiking-map";
        links[i].target = "_blank";
    }

    links = $(".OSMWiki");
    for (var i = 0; i < links.length; ++i) {
        links[i].href = "http://wiki.openstreetmap.org/wiki/WikiProject_Israel";
        links[i].target = "_blank";
    }
    links = $(".OSMForum");
    for (var i = 0; i < links.length; ++i) {
        links[i].href = "http://forum.openstreetmap.org/viewforum.php?id=33";
        links[i].target = "_blank";
    }
}

/*
 jQuery(window).load(function() {
 //map.on('locationfound', onLocationFound);
 var isMobile = (((window.matchMedia) && (window.matchMedia('(max-device-width: 960px)').matches)) || (screen.width <= 960));
 
 });
 
 function onLocationFound(e) {
 var radius = e.accuracy / 2;
 L.marker(e.latlng).addTo(map)
 .bindPopup("You are within " + radius + " meters from this point").openPopup();
 L.circle(e.latlng, radius).addTo(map);
 }
 
 
 function onLocateClick() {
 map.locate({setView: true, maxZoom: 15});
 }
 */