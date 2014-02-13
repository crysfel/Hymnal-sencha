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
            slider : 'main'
        },
		control : {
            
        }
	},

	init  	: function() {
        var favs = Ext.create('Hymnal.store.Favorites',{
            id : 'Favorites'
        });

        favs.load();
	}
	
});