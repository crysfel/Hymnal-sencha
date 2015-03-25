Ext.define('Hymnal.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        views: ['Main']
    },

    isActive: function() {
        return true;//Ext.os.is('Phone');
    },

    launch: function() {
        Ext.Viewport.add(Ext.create('Hymnal.view.phone.Main'));
    }
});