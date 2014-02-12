/**
 * @class Hymnal.view.Configurations
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.Configurations',{
    extend      : 'Hymnal.view.Card',
    alias       : 'widget.configurations',
    requires	: [
		'Ext.form.FieldSet',
		'Ext.field.Spinner',
		'Ext.field.Select'
    ],

    config		: {
		title   : 'Config',
        padding  : 10,
        iconCls : 'settings',
        toolbar     : [
            {title:'Mis Favoritos'}
        ],
		items	: [{
			xtype	: 'fieldset',
			defaults: {labelWidth:'50%'},
			items	: [{
				xtype	: 'spinnerfield',
				label	: 'Tamaño fuente',
				minValue: 20,
				maxValue: 100,
				value	: 40,
				stepValue: 10,
				name	: 'fontSize'
			},{
				xtype: 'selectfield',
				label: 'Fondo',
				name : 'background',
				options: [
					{text: 'Blanco',  value: 'bg-white'},
					{text: 'Negro', value: 'bg-black'},
					{text: 'Sepia',  value: 'bg-sepia'}
				]
			}]
		},{
			xtype : 'container',
			cls   : 'about',
			docked	: 'bottom',
			html  : 'Esta aplicación ha sido desarrollada por Bleex S de RL MI'
		}]
    }
});