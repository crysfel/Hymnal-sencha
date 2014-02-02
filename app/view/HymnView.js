/**
 * @class Hymnal.view.HymnView
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.HymnView',{
    extend      : 'Ext.Container',
    alias       : 'widget.hymnview',
    requires	: [
		'Ext.Audio'
    ],

    config		: {
    	model       : null,
		items		: [{
			docked	: 'top',
            xtype	: 'component',
            cls     : 'hymnal-title-bar',
            itemId  : 'hymnTitle',
            tpl	    : [
                '<span class="icon-menu"></span>',
                '<h1>Himno #{id}</h1>',
                '<span class="icon-heart-empty"></span>'
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

    setHymn	: function(model){
		var me = this;

		me.setData(model.getData());
		me.down('#hymnTitle').setData(model.getData());
		me.setModel(model);
    }
});