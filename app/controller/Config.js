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
				selector:'formpanel'
			},
			carousel : {
				selector	: 'main hymnscarousel'
			}
		},
		control		: {
			'formpanel button[action=save]' : {
				tap	: 'saveConfig'
			}
		}
    },

    init : function(){
		var me = this,
			config = Ext.decode(localStorage.getItem('hymnal-config'));

		if(me.getConfigForm()){
			setTimeout(function(){
				me.getConfigForm().setValues({
					fuente : config.font.size
				});
			},200);
		}else{
			setTimeout(function(){
				me.getConfigForm().setValues({
					fuente : config.font.size
				});
			},2000);
		}
    },

    saveConfig	: function(){
		var me = this,
		form = me.getConfigForm(),
		values = form.getValues(),
		config = Ext.decode(localStorage.getItem('hymnal-config'));
		config.font.size = values.fuente;

		me.getCarousel().bodyElement.setStyle('font-size',(config.font.max * config.font.size/100)+'px');

		localStorage.setItem('hymnal-config',Ext.encode(config));
		Ext.Msg.alert('Alerta','Configuración guardada!');
    }
});