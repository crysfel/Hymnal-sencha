/**
 * @class Hymnal.view.SongView
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.SongView',{
    extend      : 'Ext.Container',
    alias       : 'widget.songview',
    requires	: [
		'Ext.Audio'
    ],

    config		: {
    	model       : null,
		items		: [{
			docked	: 'top',
            xtype	: 'component',
            cls     : 'hymnal-title-bar',
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

    initialize : function(){
        this.callParent(arguments);

        this.element.on('tap',this.handleTab,this);
    },

    setHymn	: function(model){
		var me = this;

		me.setData(model.getData());
		me.down('#hymnTitle').setData(model.getData());
		me.setModel(model);
    },

    handleTab : function(){
        console.log(arguments);
    }
});