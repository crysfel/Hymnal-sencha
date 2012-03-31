/**
 * @class Hymnal.store.Hymns
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.store.Hymns',{
    extend      : 'Ext.data.Store',
    alias       : 'store.hymns',

    config      : {
        model       : 'Hymnal.model.Hymn',

        proxy       : {
            type    : 'memory',
            reader  : {
                type            : 'json',
                rootProperty    : 'data'
            }
        }
    }
});