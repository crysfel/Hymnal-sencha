/**
 * @class Hymnal.view.Home
 * @extends Ext.tab.TabPanel
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.Home',{
    extend      : 'Ext.tab.Panel',
    alias       : 'widget.home',

    config		: {
		tabBar			: {
			layout	: {
				pack	: 'center',
				align	: 'center'
			},
			docked		: 'bottom'
		},
		items			: [{
			title	: "Indice",
			layout	: 'fit',
			items	: [{
				xtype	: 'hymnslist'
			}],
			iconCls	: 'search'
		},{
			title	: "Temas",
			items	: {
				xtype	: 'categories'
			},
			iconCls	: 'bookmarks'
		},{
			title	: "Mas",
			html	: "Config",
			iconCls	: 'more'
		}]
    }
});