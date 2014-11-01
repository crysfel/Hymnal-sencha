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
            home : 'main',
            list : 'songlist list',
            view : 'songview',
            title: 'songview #titlebar',
            player : 'player',
            menu   : 'main main-menu'
        },
        control : {
            'songlist list' : {
                show   : 'loadSongs',
                itemtap: 'showSong'
            },
            'songlist searchfield' : {
                action : 'searchSongs',
                blur   : 'searchSongs'
            },
            'songview' : {
                show   : 'showSong',
                favorite : 'saveFavorite',
                hide   : 'hidePlayer',
                play   : 'playSong'
            }
        }
    },

    loadSongs : function(){
        var me = this,
            hymns = localStorage.getItem('hymns');

        if(!hymns){
            Ext.util.JSONP.request({
                url         : Hymnal.Config.LYRICS_URL,
                success     : me.saveData,
                scope       : me
            });
        }else{
            me.importDataToStore(Ext.decode(hymns));
        }
    },

    saveData : function(hymns,options){
        localStorage.setItem('hymns', Ext.encode(hymns));
        localStorage.setItem('latest-version',hymns.version);
        localStorage.setItem('latest-update',Ext.Date.format(new Date(),'Y-m-d H:i:s'));

        this.importDataToStore(hymns);
    },

    importDataToStore : function(hymns){
        var me = this;
        
        me.getList().getStore().add(hymns.data);
    },

    searchSongs : function(field){
        var value = field.getValue();

        this.getList().getStore().clearFilter();
        if(value){
            if(Ext.isNumber(+value)){
                this.getList().getStore().filter('id',value);
            }else{
                try{
                    var regexp = new RegExp(value,'ig');
                    this.getList().getStore().filter('title',regexp);
                }catch(e){
                    Ext.Msg.alert('Sin resultados','Lo sentimos pero no se encontraron resultados con esas palabras de búsqueda.');
                }
            }
        }
    },

    showSong : function(cmp,index,item,model){
        var player = this.getPlayer(),
            config = Ext.decode(localStorage.getItem('hymnal-config')),
            trackEL = player.element.down('.player-play-track'),
            songEl = player.element.down('.player-play-voice');

        if(!model){
            if(!this.getView().getModel()){
                model = this.getList().getStore().getAt(0);
                this.getView().setSong(model);
            }
        }else{
            if(Ext.os.is('Phone')){
                this.getHome().list.select(1); //need to find a better way to select a different view 
            }else{
                this.getMenu().select('songview');
            }
            this.getView().setSong(model);
        }

        if(model && !player.isPlaying()){
            player.setSong(model.getData());
        }
        
        player.setVoice(true);
        songEl.addCls('player-selected');
        trackEL.removeCls('player-selected');
            
        if(config){
            cmp.bodyElement.setStyle('font-size',(config.font.max * config.font.size/100)+'px');

            if (config.track == 'music') {
                player.setVoice(false);
                trackEL.addCls('player-selected');
                songEl.removeCls('player-selected');
            }
        }

        this.getPlayer().show(true);
    },

    saveFavorite : function(id,model){
        var favs = Ext.StoreMgr.lookup('Favorites'),
            favIndex = favs.find('num',id),
            exist = favIndex !== -1;

        if(exist){
            favs.removeAt(favIndex);
        }else{
            favs.add({
                num     : id,
                title   : model.get('title'),
                content : model.get('preview')
            });    
            favs.sync();
        }
        
        favs.sync();

        this.getView().renderTitle(model);
    },

    hidePlayer : function(){
        if(this.getPlayer() && !this.getPlayer().isPlaying()){
            this.getPlayer().hide(true);
        }
    },

    playSong : function(id,model){
        var player = this.getPlayer();

        player.setSong(model.getData());
        player.confirm();
    }
});