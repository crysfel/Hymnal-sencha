/**
 * @class Hymnal.view.Favorites
 * @extends Ext.Container
 * 
 */
Ext.define('Hymnal.view.Favorites', {
    extend: 'Hymnal.view.Card',
    xtype : 'favorites',

    config: {
        toolbar     : [
            {title:'Mis Favoritos'},
            {cls:'icon-pencil',fn:'toggleEditMode'}
        ],
        items       : []   
    },

    toggleEditMode : function(){

    }
});