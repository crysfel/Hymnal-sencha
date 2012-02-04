/**
 * @class Hymnal.view.Categories
 * @extends Ext.Panel
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.Categories',{
    extend      : 'Ext.Panel',
    alias       : 'widget.categories',

    config		: {
		items	: [{
			xtype	: 'toolbar',
			docked	: 'top',
			title	: 'Índice por temas'
		},{
			xtype		: 'list',
			itemTpl		: '<p>{name}</p>',
			store		: 'Hymnal.store.Categories'
		}]
    }
});