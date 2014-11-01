/**
 * @class Hymnal.stores.Favorites
 * @extends Ext.data.Store
 * 
 * This class manage the favorites songs, using local storage proxy to persist
 * the data.
 */
Ext.define('Hymnal.store.Favorites', {
    extend: 'Ext.data.Store',
    requires : [
        'Ext.data.proxy.LocalStorage',
        'Hymnal.model.Song'
    ],

    config: {
        model : 'Hymnal.model.Song',
        proxy : {
            type : 'localstorage',
            id   : 'favorite'
        }
    }
});