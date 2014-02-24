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
			},
            'configurations radiofield' : {
                change  : 'saveConfig'
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
				background:'bg-white',
                track: 'voice'
			};
			localStorage.setItem('hymnal-config',Ext.encode(config));
		}

        Ext.each(items,function(item){
            if(item.isXType('spinnerfield')) {
                item.setValue(config.font.size);
            }else if(item.isXType('radiofield')) {
                if (item.getValue() == config.track) {
                    item.check();
                }
            }else{
                item.setValue(config.background);
            }
        });
    },

    saveConfig	: function(comp,value){
    	var config = Ext.decode(localStorage.getItem('hymnal-config'));

    	if (comp.isXType('spinnerfield')) {
			config.font.size = value;
    	} else if (comp.isXType('selectfield')){
    		config.background = value;
    	}else {
            if (comp.isChecked()) {
                config.track = comp.getValue();
            }
        }
		localStorage.setItem('hymnal-config',Ext.encode(config));
    }
});