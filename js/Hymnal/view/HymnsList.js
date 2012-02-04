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
				title	: 'Índice por títulos'
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
			hidden	: true,
			itemId	: 'searchbar',
			items	: [{
				xtype	: 'searchfield',
				flex	: 1,
				placeHolder	: 'Búsque por palabras o número'
			}]
		},{
			xtype		: 'list',
			itemTpl		: '<h2 class="hymn-title">{title}</h2><p class="hymn-description">{id} {preview}...</p>',
			grouped		: true,
			indexBar	: {
				docked	: 'right',
				overlay	: true,
				alphabet: true
			},
			store		: {
				type	: 'hymns'
			}
		},{
			cls		: 'hymn-content',
			itemId	: 'hymn',
			scrollable : 'vertical',
			tpl		: ['<h3>{title}</h3><p>{content}</p>']
		}]
    }
});