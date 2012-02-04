/**
 * @class Hymnal.store.Categories
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.store.Categories',{
    extend      : 'Ext.data.Store',

    config		: {
	    model		: 'Hymnal.model.Hymn',

	    //autoLoad	: true,
	    proxy		: {
			type	: 'ajax',
			url		: Hymnal.BASE_PATH+'index.php/hymnal/findCategories',
			reader	: {
				type			: 'json',
				rootProperty	: 'data'
			}
	    }
	}
});