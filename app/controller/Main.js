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
            }
        }
	},

	init  	: function() {
        var favs = Ext.create('Hymnal.store.Favorites',{
            id : 'Favorites'
        });

        favs.load();
	},

    loadPreviousSong : function(current){
        if(current > 1){
            var player = this.getPlayer(),
                SongsController = this.getApplication().getController('Songs');

            current--;
            
            var model = this.getList().getStore().getById(current);
            SongsController.playSong(current,model);

            if(!this.getView().isHidden()){
                SongsController.showSong(this.getView(),current,null,model);
            }
        }
    },

    loadNextSong    : function(current){
        if(current < 613){
            var player = this.getPlayer(),
                SongsController = this.getApplication().getController('Songs');

            current++;
            var model = this.getList().getStore().getById(current);
            SongsController.playSong(current,model);

            if(!this.getView().isHidden()){
                SongsController.showSong(this.getView(),current,null,model);
            }
        }
    }
	
});