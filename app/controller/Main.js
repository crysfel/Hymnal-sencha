/**
 * @class Hymnal.controller.Main
 * @extends Ext.app.Controller
 *
 * Description
 */

Ext.define('Hymnal.controller.Main',{
	extend	: 'Ext.app.Controller',
    requires: [
        'Hymnal.store.Favorites'
    ],

	config	: {	
        refs    : {
            slider  : 'main',
            list    : 'songlist list',
            view : 'songview',
            player  : 'player'
        },
		control : {
            'player' : {
                previous : 'loadPreviousSong',
                next     : 'loadNextSong'
            },
            'main'   : {
                preferences  : 'setPreferences',
            },
            'main main-menu' : {
                itemtap : 'showView'
            }
        }
	},

	init  	: function() {
        var favs = Ext.create('Hymnal.store.Favorites',{
                id : 'Favorites'
            });

        favs.load();

        this.preferences = Ext.decode(localStorage.getItem('hymnal-config') || '{}');
	},

    loadPreviousSong : function(current){
        if(current > 1){
            var player = this.getPlayer(),
                SongsController = this.getApplication().getController('Songs');

            current--;
            
            var model = this.getList().getStore().getById(current);
            if(player.isPlaying()){
                SongsController.playSong(current,model);
            }else{
                player.setSong(model.getData());
            }

            if(!this.getView().isHidden()){
                SongsController.showSong(this.getView(),current,null,model);
            }else{
                player.setSong(model.getData());
            }
        }
    },

    loadNextSong    : function(current){
        if(current < 613){
            var player = this.getPlayer(),
                SongsController = this.getApplication().getController('Songs');

            current++;
            var model = this.getList().getStore().getById(current);
            if(player.isPlaying()){
                SongsController.playSong(current,model);
            }

            if(!this.getView().isHidden()){
                SongsController.showSong(this.getView(),current,null,model);
            }
        }
    },

    setPreferences  : function(preferences){
        preferences = preferences || this.preferences

        Ext.getBody().removeCls('theme-light theme-dark theme-orange theme-blue');
        Ext.getBody().addCls(preferences.background);
    },

    showView : function(xtype){
        var card = this.getSlider().down(xtype);

        if(card){
            this.getSlider().setActiveItem(card);
        }
    }
	
});