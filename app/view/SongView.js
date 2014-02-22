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
          {icon:'icon-cd',fn:'playSong'},
          {icon:'icon-heart<tpl if="favorite">-empty</tpl>',fn:'toggleFavorite'}
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
    		var me = this,
            favs = Ext.StoreMgr.lookup('Favorites');

    		me.setData(model.getData());
    		me.down('#titlebar').setData({
            id : model.get('id'),
            favorite : favs.find('num',model.get('id')) === -1
        });
    		me.setModel(model);
    },

    toggleFavorite : function(){
        this.fireEvent('favorite',this.getModel().get('id'),this.getModel());
    },

    playSong : function(){
        this.fireEvent('play',this.getModel().get('id'),this.getModel());
    }
});