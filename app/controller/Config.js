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
				me.getConfigForm().setValues(config);
			},200);
		}else{
			setTimeout(function(){
				me.getConfigForm().setValues(config);
			},2000);
		}
    },

    saveConfig	: function(){
		var me = this,
		form = me.getConfigForm(),
		values = form.getValues();

		localStorage.setItem('hymnal-config',Ext.encode(values));
		Ext.Msg.alert('Alerta','Configuración guardada!');
    }
});