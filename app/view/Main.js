Ext.define("Hymnal.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.util.JSONP'
    ],
    xtype: 'main',
    
    config: {
        tabBar          : {
            layout  : {
                pack    : 'center',
                align   : 'center'
            },
            docked      : 'bottom'
        },
        items           : [{
            title   : 'Búsqueda',
            layout  : 'fit',
            items   : [{
                xtype   : 'hymnslist'
            }],
            iconCls : 'search'
        },{
            title   : 'Himnos',
            layout  : 'fit',
            items   : {
                xtype   : 'hymnscarousel'
            },
            iconCls : 'bookmarks'
        },{
            xtype   : 'configurations'
        }]
    }
});