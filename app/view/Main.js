Ext.define("Hymnal.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',
    requires: [
        'Ext.TitleBar',
        'Ext.util.JSONP',
        'Hymnal.view.SongList',
        'Hymnal.view.SongView',
        'Hymnal.view.Favorites',
        'Hymnal.view.Configurations'
    ],
    xtype: 'main',
    
    config: {
        slideSelector: false,
        containerSlideDelay: 10,
        selectSlideDuration: 200,
        listPosition: 'left',
        list: {
            maxDrag: 200,
            width: 50,
            grouped: false,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'dark'
            }]
            
        },
        items           : [{
            xtype   : 'songlist',
            title   : '<span class="icon-search image-font"></span>'
        },{
            xtype   : 'songview',
            title   : '<span class="icon-book image-font"></span>'
        },{
            xtype   : 'favorites',
            title   : '<span class="icon-heart image-font"></span>'
        },{
            xtype   : 'configurations',
            title   : '<span class="icon-cog image-font"></span>'
        }]
    }
});