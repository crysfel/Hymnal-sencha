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
        toolbar     : [
            {title:'Configuraciones'}
        ],
		items	: [{
            xtype : 'container',
            layout: 'auto',
            cls   : 'configurations',
            items : [{
                xtype   : 'fieldset',
                defaults: {labelWidth:'50%'},
                cls     : 'custom-panel',
                items   : [{
                    xtype   : 'spinnerfield',
                    label   : 'Tamaño fuente',
                    minValue: 20,
                    maxValue: 100,
                    value   : 40,
                    stepValue: 10,
                    name    : 'fontSize'
                },{
                    xtype: 'selectfield',
                    label: 'Fondo',
                    name : 'background',
                    options: [
                        {text: 'Blanco',  value: 'bg-white'},
                        {text: 'Negro', value: 'bg-black'},
                        {text: 'Sepia',  value: 'bg-sepia'}
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
            },{
                xtype: 'component',
                cls  : 'custom-panel',
                html : [
                    '<h4>Sobre esta app</h4>',
                    '<p>Esta app ha sido desarrollada para el beneficio de todos aquellos que quieran tener una devoción personal con Dios por medio del canto.</p>',
                    '<p>De parte de los desarrolladores les enviamos un fraternal saludo esperando que esta app sea de gran bendición.</p>'
                ].join('')
            }]     
        }]
    }
});