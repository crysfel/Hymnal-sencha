/**
 * @class Hymnal.model.Song
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

(function(){

var regexp = /^\w*1\./;

Ext.define('Hymnal.model.Song',{
    extend      : 'Ext.data.Model',

	config		: {
		idProperty	: 'id',
		fields		: [
			{name:'id',type:'int'},
            {name:'num',mapping:'id'},
			'title',
			'content',
            {name:'preview',mapping:'content',convert:function(v,record){
                    if(record.get('content')){
                        var limit = Ext.os.is('Phone')? 30:100,
                            str = record.get('content').substring(0,limit);
                        return str.replace(regexp,'');
                    }
                }
            }
		]
	}
});

})();