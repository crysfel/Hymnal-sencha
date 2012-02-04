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
		fields		: [
			"id","title",
			{name:"titlePlain",mapping:'title_plain'},
			"preview","content","musicImage"
	    ]
	}
});