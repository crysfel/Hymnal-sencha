/**
 * @class Hymnal.view.SongView
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.SongView',{
    extend      : 'Hymnal.view.Card',
    alias       : 'widget.songview',
    requires	: [
		  'Ext.Audio'
    ],

    config		: {
    	model       : null,
      toolbar     : [
          {title:'Himno #{id}'},
          {cls:'icon-heart-empty',fn:'toggleFavorite'}
      ],
		  cls   : 'hymn-view',
		  height: 'auto',
		  scrollable	 : {
			   direction     : 'vertical',
			   directionLock : true
		  },
		  tpl   : '<h3>{title}</h3><p>{content}</p>',
      items : []
    },

    setSong	: function(model){
    		var me = this;

    		me.setData(model.getData());
    		me.down('#titlebar').setData(model.getData());
    		me.setModel(model);
    },

    toggleFavorite : function(){
        console.log(this.getModel().get('id'));
    }
});