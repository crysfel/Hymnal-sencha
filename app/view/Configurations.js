/**
 * @class Hymnal.view.Configurations
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.view.Configurations',{
    extend      : 'Ext.Container',
    alias       : 'widget.configurations',
    requires	: [
		'Ext.form.FieldSet',
		'Ext.field.Spinner',
		'Ext.field.Toggle'
    ],

    config		: {
		title   : 'Config',
        padding  : 10,
        iconCls : 'settings',
		items	: [{
			xtype	: 'toolbar',
			docked	: 'top',
			title	: 'Configuraciones'
		},{
			xtype	: 'fieldset',
			defaults: {labelWidth:'50%'},
			items	: [{
				xtype	: 'spinnerfield',
				label	: 'Tamaño fuente',
				minValue: 20,
				maxValue: 100,
				value	: 60,
				increment: 10,
				name	: 'fuente'
			},{
				xtype	: 'togglefield',
				label	: 'Ver partitura',
				name	: 'partitura'
			}]
		}]
    }
});