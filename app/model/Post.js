/**
 * @class Hymnal.model.Post
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

(function(){

var Format = Ext.util.Format,
    more = /\[more\]/gi,
    youtube = /youtube\.com/,
    youtubeId = /watch\?v=([\w\-]*)/;

Ext.define('Hymnal.model.Post',{
    extend      : 'Ext.data.Model',

    config      : {
        idProperty  : 'id',
        fields      : [
            {name:'id',type:'int'},
            {name:'title'},
            {name:'content',convert:function(value){
                if(value){
                    if(more.test(value)){
                        return value.replace(more,'');
                    }
                    return value;
                }
            }},
            {name:'time',convert:function(value){
                var time = new Date(value);
                
                return Format.date(time,'d M, Y');
            }},
            {name:'asset'},
            {name:'assetType'},
            {name:'author'},
            {name:'preview',mapping:'content',convert:function(value){
                if(value){
                    var index = value.indexOf('[more]');
                    if(index > 0){
                        return value.substring(0,index);
                    }
                    return value;
                }
            }},
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