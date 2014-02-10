/**
 * @class Hymnal.view.Favorites
 * @extends Ext.Container
 * 
 */
Ext.define('Hymnal.view.Favorites', {
    extend: 'Ext.Container',
    xtype : 'favorites',

    config: {
        items       : [{
            docked  : 'top',
            xtype   : 'component',
            cls     : 'hymnal-title-bar',
            html    : [
                '<span class="icon-menu"></span>',
                '<h1>Favoritos</h1>'
            ].join('')
        }]     
    }
});