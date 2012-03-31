//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>

Ext.application({
    name: 'Hymnal',

    requires: [
        'Ext.MessageBox'
    ],

    controllers: ['Main','Config'],

    glossOnIcon : false,
    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.png',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    onUpdated: function() {
        Ext.Msg.confirm(
            "Applicación actualizada",
            "Esta aplicación se ha actualizado satisfactoriamente a la versión más reciente. ¿Deseas reiniciarla ahora?",
            function() {
                localStorage.removeItem('hymns');
                window.location.reload();
            }
        );
    }
});
