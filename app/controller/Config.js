/**
 * @class Hymnal.controller.Config
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.controller.Config',{
    extend      : 'Ext.app.Controller',

    config		: {
		refs	: {
			configForm	: {
				selector:'configurations'
			},
			carousel : {
				selector : 'main hymnscarousel'
			}
		},
		control		: {
			'configurations' : {
				activate : 'setUserPreferences'
			},
			'configurations spinnerfield' : {
				spin	: 'saveConfig'
			},
			'configurations selectfield' : {
				change	: 'saveConfig'
			}
		}
    },

    setUserPreferences : function(container){
    	var me = this,
    		config = Ext.decode(localStorage.getItem('hymnal-config')),
            items = me.getConfigForm().down('fieldset').getInnerItems();

    	if(!config){
			config = {
				font:{
					size:40,max:50
				},
				background:'bg-white'
			};
			localStorage.setItem('hymnal-config',Ext.encode(config));
		}

        Ext.each(items,function(item){
            if(item.isXType('spinnerfield')) {
                item.setValue(config.font.size);
            } else{
                item.setValue(config.background);
            }
        });
    },

    saveConfig	: function(comp,value){
    	var config = Ext.decode(localStorage.getItem('hymnal-config'));

    	if (comp.isXType('spinnerfield')) {
			config.font.size = value;
    	} else{
    		config.background = value;
    	}
		localStorage.setItem('hymnal-config',Ext.encode(config));
    }
});