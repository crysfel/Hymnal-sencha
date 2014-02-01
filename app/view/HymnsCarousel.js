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
			xtype	: 'toolbar',
			docked	: 'top',
			items	: [{
				xtype	: 'button',
				iconMask: true,
				iconCls	: 'arrow_right',
				action	: 'play'
			},{
				xtype	: 'spacer'
            },{
				xtype	: 'audio',
				hidden	: true
			},{
				xtype	: 'title',
				title	: 'Himno #'
			},{
				xtype	: 'spacer'
            },{
				xtype	: 'button',
				iconMask: true,
				hidden	: true,
				iconCls	: 'music1'
			}]
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