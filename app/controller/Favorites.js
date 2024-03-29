/**
 * @class Hymnal.controller.Favorites
 * @extends Ext.app.Controller
 * 
 * The favorites controller to manage the favorites view
 */
Ext.define('Hymnal.controller.Favorites', {
    extend: 'Ext.app.Controller',

    config: {
        refs    : {
            home : 'main',
            view : 'songview',
            list : 'songlist list',
            favs : 'favorites',
            player  : 'player',
            menu    : 'main main-menu'
        },
        control : {
            'songview' : {
                favorite : 'updateFavoritesView'
            },
            'favorites'  : {
                show     : 'updateFavoritesView',
                remove   : 'removeFavorite',
                play     : 'playFavorite',
                showsong : 'showSong'
            }
        }
    },

    updateFavoritesView : function(){
        if(this.getFavs()){
            var favs = Ext.StoreMgr.lookup('Favorites');

            this.getFavs().updateView(favs.getRange(0));
        }
    },

    removeFavorite : function(id){
        var favs = Ext.StoreMgr.lookup('Favorites'),
            index = favs.find('num',id);

        if(index > -1){
            favs.removeAt(index);
            favs.sync();

            this.getFavs().updateView(favs.getRange(0));
        }
    },

    showSong : function(id){
        var model = this.getList().getStore().getById(id);

        if(Ext.os.is('Phone')){
            this.getHome().list.select(1);
        }else{
            this.getMenu().select('songview');
        }
        this.getView().setSong(model);
    },

    playFavorite : function(id){
        var model = this.getList().getStore().getById(id),
            SongsController = this.getApplication().getController('Songs');;

        SongsController.playSong(id,model);
        this.getPlayer().showPlayer();
    }
});