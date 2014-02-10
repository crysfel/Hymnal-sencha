/**
 * @class Hymnal.model.Song
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

(function(){

var regexp = /^1\./;

Ext.define('Hymnal.model.Song',{
    extend      : 'Ext.data.Model',

	config		: {
		idProperty	: 'id',
		fields		: [
			{name:'id',type:'int'},
			'title',
			'content',
            {name:'preview',mapping:'content',convert:function(v,record){
                    var str = record.get('content').substring(0,30);
                    return str.replace(regexp,'');
                }
            }
		]
	}
});

})();