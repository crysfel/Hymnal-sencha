/**
 * @class Hymnal.model.Category
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.model.Category',{
    extend      : 'Ext.data.Model',

    config	: {
		fields		: [
			"id","name",{name:"range",mapping:'numbers'}
		]
    }
});