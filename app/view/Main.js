Ext.define("Hymnal.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',
    requires: [
        'Ext.TitleBar',
        'Ext.util.JSONP'
    ],
    xtype: 'main',
    
    config: {
        slideSelector: false,
        containerSlideDelay: 10,
        selectSlideDuration: 200,
        itemMask: true,
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
            xtype   : 'hymnslist',
            title   : '<span class="icon-search image-font"></span>'
        },{
            xtype   : 'hymnview',
            title   : '<span class="icon-book image-font"></span>'
        },{
            xtype   : 'component',
            title   : '<span class="icon-heart image-font"></span>'
        },{
            xtype   : 'configurations',
            title   : '<span class="icon-cog image-font"></span>'
        }]
    }
});