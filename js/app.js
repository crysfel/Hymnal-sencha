
Ext.Loader.setConfig({
    enabled			: true,
    disableCaching	: true
});

Ext.application({
    name		: 'Hymnal',
    appFolder	: Hymnal.BASE_PATH+'js/Hymnal',
    
    controllers : [
        'Home'
    ],

    launch : function() {
        window[this.name].App = this;
    }
});