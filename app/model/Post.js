/**
 * @class Hymnal.model.Post
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

(function(){

var youtube = /youtube\.com/,
    youtubeId = /watch\?v=([\w\-]*)/;

Ext.define('Hymnal.model.Post',{
    extend      : 'Ext.data.Model',

    config      : {
        idProperty  : 'id',
        fields      : [
            {name:'id',type:'int'},
            'title',
            'content',
            'time',
            'asset',
            'assetType',
            'author',
            {name:'youtube',convert:function(values,record){
                var url = record.get('asset'),
                    id;
                if(youtube.test(url)){
                    id = url.match(youtubeId);
                    
                    if(id[1]){
                        return id[1];
                    }
                }
            }}
        ]
    }
});

})();