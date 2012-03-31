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
			form	: 'formpanel'
		},
		control		: {
			'formpanel button[action=save]' : {
				tap	: 'saveConfig'
			}
		}
    },

    saveConfig	: function(){
		var me = this,
		form = me.getForm(),
		values = form.getValues();

		localStorage.setItem('hymnal-config',Ext.encode(values));
		Ext.Msg.alert('Alerta','Configuración guardada!');
    }
});