/**
 * @class Hymnal.view.HymnsCarousel
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.HymnsCarousel',{
    extend      : 'Ext.Container',
    alias       : 'widget.hymnscarousel',
    requires	: [
		'Ext.Audio'
    ],

    config		: {
		items		: [{
			docked	: 'top',
            xtype	: 'component',
            cls     : 'hymnal-title-bar',
            itemId  : 'hymnTitle',
            tpl	    : [
                '<span class="icon-menu"></span>',
                '<h1>Himno #{id}</h1>',
                '<span class="icon-heart-empty"></span>',
                '<span class="icon-note-beamed"></span>'
            ].join('')
		}],
		cls   : 'hymn-view',
		height: 'auto',
		scrollable	: {
			direction : 'vertical',
			directionLock : true
		},
		tpl   : '<h3>{title}</h3><p>{content}</p>'
    },

    addHymn	: function(model){
		var me = this;

		me.setData(model.getData());
		me.down('#hymnTitle').setData(model.getData());
    },

    insertHymn	: function(index,model){
		// var me = this;

		// return me.insert(index,{
		// 	xtype : 'container',
		// 	padding: 10,
		// 	itemId: 'hymn-'+model.getId(),
		// 	scrollable	: {
		// 		direction : 'vertical',
		// 		directionLock : true
		// 	},
		// 	model: model,
		// 	items: [{
		// 		xtype : 'component',
		// 		cls   : 'hymn-view',
		// 		data  : model.getData(),
		// 		height: 'auto',
		// 		tpl   : '<h3>{title}</h3><p>{content}</p>'
		// 	}]
		// });
    }
});