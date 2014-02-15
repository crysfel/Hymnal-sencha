/**
 * @class Hymnal.Config
 * 
 */
Ext.define('Hymnal.Config', {
    singleton   : true,

    //LYRICS_URL   : 'http://demos.bleext.com/hymnal/index.php/hymnal/findAll',
    LYRICS_URL   : 'http://10.0.0.6:3000/api/hymns/search',
    VERSION_URL  : 'http://demos.bleext.com/hymnal/index.php/hymnal/latestVersion',
    TIMEOUT      : 1000, //Time to wait for the next page
    PAGE_SIZE    : 50,

    SONGS_URL    : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/',
    TRACKS_URL   : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/',

    FONT_SIZE    : Ext.os.deviceType.toLowerCase()==='tablet'?50:40,
    MAX_FONT_SIZE: 50

});