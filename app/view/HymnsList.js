/**
 * @class Hymnal.view.HymnsList
 * @extends Ext.dataview.List
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.HymnsList',{
    extend      : 'Ext.Panel',
    alias       : 'widget.hymnslist',
    requires	: [
		'Ext.field.Search',
		'Ext.dataview.List',
		'Ext.carousel.Carousel'
    ],

    config		: {
		layout		: 'card',
		items		: [{
			docked	: 'top',
            xtype	: 'toolbar',
            items	: [{
				text	: 'Volver',
				ui		: 'back',
				action	: 'back',
				hidden	: true
            },{
				xtype	: 'spacer'
            },{
				xtype	: 'title',
				title	: 'Búsqueda'
            },{
				xtype: 'spacer'
            },{
				iconMask: true,
				iconCls	: 'search',
				action	: 'search',
				clearIcon : true
            }]
		},{
			xtype	: 'toolbar',
			docked	: 'top',
			itemId	: 'searchbar',
			items	: [{
				xtype	: 'searchfield',
				flex	: 1,
				height	: 27,
				placeHolder	: 'Búsque por palabras o número'
			},{
				xtype	: 'button',
				text	: 'Buscar',
				action	: 'searchhymns'
			}]
		},{
			xtype		: 'list',
			itemTpl		: '<h2 class="hymn-title">{title}</h2><p class="hymn-description">{id} {preview}...</p>',
			disableSelection : true,
			indexBar	: {
				docked	: 'right',
				overlay	: true,
				alphabet: true
			},
			store		: {
				type	: 'hymns'
			}
		}]
    }
});