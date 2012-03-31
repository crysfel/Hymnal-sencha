/**
 * @class Hymnal.view.HymnsCarousel
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.HymnsCarousel',{
    extend      : 'Ext.carousel.Carousel',
    alias       : 'widget.hymnscarousel',
    requires	: [
		'Ext.Audio'
    ],

    config		: {
		indicator	: false,
		
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
		}]
    },

    addHymn	: function(model){
		var me = this;

		me.add({
			xtype : 'container',
			padding: 10,
			itemId: 'hymn-'+model.getId(),
			scrollable	: {
				direction : 'vertical',
				directionLock : true
			},
			model: model,
			items: [{
				xtype : 'component',
				cls   : 'hymn-view',
				data  : model.getData(),
				height: 'auto',
				tpl   : '<h3>{title}</h3><p>{content}</p>'
			}]
		});
    }
});