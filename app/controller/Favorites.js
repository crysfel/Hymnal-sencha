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
            favs : 'favorites'
        },
        control : {
            'songview' : {
                favorite : 'updateFavoritesView'
            },
            'favorites'  : {
                show     : 'updateFavoritesView',
                remove   : 'removeFavorite'
            }
        }
    },

    updateFavoritesView : function(){
        if(this.getFavs()){
            var favs = Ext.StoreMgr.lookup('Favorites'),
                models = favs.getRange(0),
                records = [];

            this.getFavs().updateView(models);
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
    }
});