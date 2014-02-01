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
            xtype	: 'component',
            cls     : 'hymnal-title-bar',
            html	: [
                '<span class="icon-menu"></span>',
                '<h1>Himnario Adventista</h1>',
                '<span class="icon-search"></span>'
            ].join('')
		},{
			xtype	: 'toolbar',
			docked	: 'top',
			itemId	: 'searchbar',
            hidden  : true,
			items	: [{
				xtype	: 'searchfield',
				flex	: 1,
				placeHolder	: 'Busque por palabras o número'
			},{
				xtype	: 'button',
				text	: 'Buscar',
				action	: 'searchhymns',
				hidden	: true
			}]
		},{
			xtype		: 'list',
			itemTpl		: '<h2 class="hymn-title">{title}</h2><p class="hymn-description">{id} {preview}...</p>',
			disableSelection : true,
			emptyText	: 'No se encontraron himnos con esas palabras o número!',
			indexBar	: {
				docked	: 'right',
				overlay	: true,
				alphabet: true
			},
            infinite    : true
		}]
    }
});