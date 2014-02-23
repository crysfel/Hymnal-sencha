/**
 * @class Hymnal.Config
 * 
 */
Ext.define('Hymnal.Config', {
    singleton   : true,

    LYRICS_URL   : 'http://demos.bleext.com/hymnal/index.php/hymnal/findAll',
    //<debug>
    LYRICS_URL   : 'http://192.168.1.88:3000/api/hymns/search',
    //</debug>
    VERSION_URL  : 'http://demos.bleext.com/hymnal/index.php/hymnal/latestVersion',
    TIMEOUT      : 1000, //Time to wait for the next page
    PAGE_SIZE    : 50,

    TRACKS_URL   : 'https://s3.amazonaws.com/hymnal/music/voice/',
    VOICE_URL    : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/',

    FONT_SIZE    : Ext.os.deviceType.toLowerCase()==='tablet'?50:40,
    MAX_FONT_SIZE: 50

});