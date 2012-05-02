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
			'formpanel spinnerfield' : {
				spin	: 'saveConfig'
			},
			'formpanel selectfield' : {
				change	: 'saveConfig'
			}
		}
    },

    saveConfig	: function(){
		var me = this,
			form = me.getConfigForm(),
			values = form.getValues(),
			config = Ext.decode(localStorage.getItem('hymnal-config')),
			carousel = me.getCarousel();

		config.font.size = values.fontSize;
		config.background = values.background;

		carousel.bodyElement.setStyle('font-size',(config.font.max * config.font.size/100)+'px');
		carousel.bodyElement.removeCls('bg-white bg-black bg-sepia');
		carousel.bodyElement.addCls(config.background);

		localStorage.setItem('hymnal-config',Ext.encode(config));
    }
});