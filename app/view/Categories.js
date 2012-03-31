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
		layout	: 'card',
		items	: [{
			xtype	: 'toolbar',
			docked	: 'top',
			title	: 'Indice por temas'
		},{
			xtype		: 'list',
			ui			: 'round',
			itemTpl		: '<p>{name} <small>{range}</small></p>',
			store		: {
				type : 'categories'
			}
		}]
    }
});