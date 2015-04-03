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
		'Ext.field.Select',
        'Ext.field.Radio'
    ],

    config		: {
        layout      : 'fit',
        toolbar     : [
            {title:'Configuraciones'}
        ],
		items	: [{
            xtype : 'container',
            cls   : 'configurations',
            scrollable : 'vertical',
            items : [{
                xtype   : 'fieldset',
                defaults: {labelWidth:'50%'},
                cls     : 'custom-panel',
                items   : [{
                    xtype   : 'spinnerfield',
                    label   : 'Tamaño fuente',
                    minValue: 20,
                    maxValue: 100,
                    value   : Ext.os.is('Phone')?30:40,
                    stepValue: 10,
                    name    : 'fontSize'
                },{
                    xtype: 'selectfield',
                    label: 'Vista',
                    name : 'background',
                    options: [
                        {text: 'Claro',  value: 'theme-light'},
                        {text: 'Oscuro', value: 'theme-dark'},
                        {text: 'Naranja',  value: 'theme-orange'}
                        // {text: 'Azul',  value: 'theme-blue'}
                    ]
                },{
                    xtype: 'radiofield',
                    name : 'music',
                    value: 'voice',
                    label: 'Himno Cantado'
                },{
                    xtype: 'radiofield',
                    name : 'music',
                    value: 'music',
                    label: 'Tocar Pista'
                }]
            }]     
        }]
    }
});