/**
 * @class Hymnal.store.Categories
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.store.Categories',{
    extend      : 'Ext.data.Store',
    alias		: 'store.categories',

    config		: {
	    model		: 'Hymnal.model.Category',

	    proxy		: {
			type	: 'memory',
			reader	: {
				type			: 'json',
				rootProperty	: 'data'
			}
	    }
	}
});