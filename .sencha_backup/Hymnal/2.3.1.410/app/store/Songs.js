/**
 * @class Hymnal.store.Songs
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.store.Songs',{
    extend      : 'Ext.data.Store',
    alias       : 'store.songs',
    requires    : 'Hymnal.model.Song',

    config      : {
        model       : 'Hymnal.model.Song',

        proxy       : {
            type    : 'memory',
            reader  : {
                type            : 'json',
                rootProperty    : 'data'
            }
        }
    }
});