/**
 * @class Hymnal.model.Hymn
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.model.Hymn',{
    extend      : 'Ext.data.Model',

	config		: {
		idProperty	: 'id',
		fields		: [
			{name:'id',type:'int'},'title',
			{name:'titlePlain',mapping:'title_plain'},
			{name:'size',type:'int'},
			'preview','content','musicImage'
		]
	}
});