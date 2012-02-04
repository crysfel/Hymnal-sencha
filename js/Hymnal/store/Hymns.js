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

        sorters     : 'titlePlain',
        autoLoad    : true,
        proxy       : {
            type    : 'ajax',
            url     : Hymnal.BASE_PATH+'index.php/hymnal/findAll',
            reader  : {
                type            : 'json',
                rootProperty    : 'data'
            }
        },

        grouper  : {
            groupFn : function(record){
                return record.get('titlePlain')[0];
            }
        }
    }
});