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
            {icon:'icon-cd <tpl if="nowPlaying">hymnal-song-playing animate-spin</tpl>',fn:'playSong'},
            {icon:'icon-heart<tpl if="favorite">-empty</tpl>',fn:'toggleFavorite'}
        ],
		cls   : 'hymn-view',
		height: 'auto',
		scrollable	 : {
			direction     : 'vertical',
			directionLock : true
		},
		tpl   : new Ext.XTemplate('<div class="custom-panel"><h3>{title}</h3><p>{content}</p></div>'),
        items : []
    },

    setSong	: function(model){
		var me = this;
        
		me.setData(model.getData());
    	me.setModel(model);
        me.renderTitle(model);
    },

    toggleFavorite : function(){
        this.fireEvent('favorite',this.getModel().get('id'),this.getModel());
    },

    renderTitle   : function(model){
        if(!this.player){
            this.player = Ext.ComponentQuery.query('player')[0];
        }
        
        var favs = Ext.StoreMgr.lookup('Favorites'),
            data = {
                id          : model.get('id'),
                favorite    : favs.find('num',model.get('id')) === -1,
                nowPlaying  : this.player.isPlaying()
            };

        data.nowPlaying = data.nowPlaying && this.player.getSong().id === model.get('id');
        this.down('#titlebar').setData(data);
    },

    playSong : function(){
        var model = this.getModel();

        this.fireEvent('play',model.get('id'),model);
        this.renderTitle(model);
    }
});