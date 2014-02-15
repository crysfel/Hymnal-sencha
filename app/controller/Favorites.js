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
                show     : 'updateFavoritesView'
            }
        }
    },

    updateFavoritesView : function(){
        if(this.getFavs()){
            var favs = Ext.StoreMgr.lookup('Favorites'),
                models = favs.getRange(0),
                records = [];

            for(var i=0,len=models.length;i<len;i++){
                records.push({
                    num : models[i].get('num'),
                    title : models[i].get('title'),
                    preview : models[i].get('preview')
                });
            }

            this.getFavs().updateView(records);
        }
    }
});