Ext.define('Hymnal.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        views: ['Main']
    },

    isActive: function() {
        return true;//Ext.os.is('Tablet');
    },

    launch: function() {
        Ext.Viewport.add(Ext.create('Hymnal.view.tablet.Main'));
    }
});