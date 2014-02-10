/**
 * @class Hymnal.controller.Songs
 * @extends Ext.app.Controller
 * 
 */
Ext.define('Hymnal.controller.Songs', {
    extend: 'Ext.app.Controller',

    config: {
        page    : 0,
        total   : 0,
        refs    : {
            list : 'songlist list'
        },
        control : {
            'songlist list' : {
                show  : 'loadSongs'
            }
        }
    },

    loadSongs : function(){
       var me = this,
            data = localStorage.getItem('hymns-'+me.getPage());

        if(!data){
            Ext.Ajax.request({
                url         : Hymnal.Config.LYRICS_URL,
                method      : 'GET',
                params      : {
                    start   : me.getPage() * Hymnal.Config.PAGE_SIZE,
                    limit   : Hymnal.Config.PAGE_SIZE,
                },
                success     : me.saveData,
                scope       : me
            });
        }else{
            me.importDataToStore(Ext.decode(data));
        }
    },

    saveData : function(response,options){
        var data = Ext.decode(response.responseText);

        localStorage.setItem('hymns-' + this.getPage(), Ext.encode(data));
        localStorage.setItem('latest-version',data.version);
        localStorage.setItem('latest-update',Ext.Date.format(new Date(),'Y-m-d H:i:s'));

        this.importDataToStore(data);
    },

    importDataToStore : function(data){
        var me = this,
            last = data.songs[data.songs.length-1];
        
        me.setPage(this.getPage() + 1);
        if(last.id < data.total){
            setTimeout(function(){
                me.loadSongs();
            },Hymnal.Config.TIMEOUT);
        }

        me.getList().getStore().add(data.songs);
    }
});