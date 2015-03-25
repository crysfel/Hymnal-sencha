Ext.define("Hymnal.view.tablet.Main", {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar',
        'Ext.util.JSONP',
        'Hymnal.view.SongList',
        'Hymnal.view.SongView',
        'Hymnal.view.Favorites',
        'Hymnal.view.Configurations',
        'Hymnal.view.tablet.Menu'
    ],
    xtype: 'main',
    
    config: {
        layout      : 'card',
        items           : [{
            xtype   : 'container',
            docked  : 'left',
            cls     : 'main-menu-container',
            items   : [{xtype:'main-menu'}]
        },{
            xtype   : 'songlist'
        },{
            xtype   : 'songview'
        },{
            xtype   : 'favorites'
        },{
            xtype   : 'configurations'
        }]
    },

    initialize      : function(){
        this.callParent(arguments);

        this.on('painted',function(){
            this.fireEvent('preferences',false);
        },this);
    }
});