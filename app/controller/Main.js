/**
 * @class Hymnal.controller.Main
 * @extends Ext.app.Controller
 *
 * Description
 */

Ext.define('Hymnal.controller.Main',{
	extend	: 'Ext.app.Controller',

	config	: {	
        refs    : {
            slider : 'main'
        },
		control : {
            'songlist' : {
                openmenu : 'toggleMenu'
            }
        }
	},

	init  	: function() {

	},

    toggleMenu : function(){
        this.getSlider().toggleContainer();
    }
	
});