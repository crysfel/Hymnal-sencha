/**
 * @class Hymnal.view.Player
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The player component
 * URL for musi
 * http://ia700708.us.archive.org/0/items/HimnarioAdventista/001.mp3
 */

Ext.define('Hymnal.view.Player',{
    extend      : 'Ext.Component',
    xtype       : 'player',
    requires    : [
        'Ext.Audio',
        'Ext.Anim'
    ],

    config		: {
        song    : null,
        confirmation : false, //confirm to use internet conexion
        current : null,
        timeout : 10000,
        voice   : true,
        cls     : 'player-container',
        html    : [
            '<div class="player-knob"><span class="icon-up-open"></span></div>',
            '<div class="player-controls">',
                '<div class="player-status-bar">',
                    '<div class="player-timeline" style="width:0%"></div>',
                '</div>',
                '<div class="player-song-title">&nbsp;</div>',
                '<span class="player-control-previous icon-backward-circled"></span>',
                '<span class="player-control-play icon-play-circled"></span>',
                '<span class="player-control-next icon-forward-circled"></span>',
                '<span class="icon-note-beamed player-play-track"></span>',
                '<span class="player-play-voice player-selected">',
                    '<span class="icon-user"></span>',
                    '<span class="icon-note"></span>',
                '</span>',
            '</div>'
        ].join('')
    },

    initialize   : function(){
        var me = this;

        me.callParent(arguments);

        me.audio = Ext.create('Ext.Audio',{
            hidden: true
        });

        me.titleEl = me.element.down('.player-song-title');
        me.timelineEl = me.element.down('.player-timeline');
        me.trackEl = me.element.down('.player-play-track');
        me.songEl = me.element.down('.player-play-voice');
        me.playPauseEl = me.element.down('.player-control-play');
        me.knobEl = me.element.down('.player-knob');

        me.element.on('tap',me.handleTapEvents,me);
        me.element.on('swipe',me.swipePlayer,me);
        me.audio.on('timeupdate',Ext.Function.createThrottled(this.updateTimeline,1000,this));
        me.audio.on('ended',this.pause,this);
        me.on('hideplayer',this.hidePlayer,this,{buffer:me.getTimeout()});

    },

    applySong : function(song){
        this.setTitle(song);
        return song;
    },

    handleTapEvents : function(event){
        var me = this;

        if(event.getTarget('.player-play-voice')){
            if(!me.getVoice()){
                me.songEl.addCls('player-selected');
                me.trackEl.removeCls('player-selected');
                this.fireEvent('playvoice',me.getSong().id);
                me.setVoice(true);
                if(me.isPlaying()){
                    me.play();
                }
            }
        }else if(event.getTarget('.player-play-track ')){
            if(me.getVoice()){
                me.trackEl.addCls('player-selected');
                me.songEl.removeCls('player-selected');
                this.fireEvent('playtrack',me.getSong().id);
                me.setVoice(false);
                if(me.isPlaying()){
                    me.play();
                }
            }
        }else if(event.getTarget('.player-control-play')){
            me.toggleReproduction();
        }else if(event.getTarget('.player-control-previous')){
            me.fireEvent('previous',me.getSong().id);
        }else if(event.getTarget('.player-control-next')){
            me.fireEvent('next',me.getSong().id);
        }else if(event.getTarget('.player-status-bar')){
            me.fastForward(event);
        }else if(event.getTarget('.player-knob')){
            me.showPlayer();
        }
        me.fireEvent('hideplayer');
    },

    toggleReproduction : function(){
        if(this.audio.isPlaying()){
            this.pause();
        }else{
            this.confirm();
        }
    },

    setTitle : function(song){
        this.titleEl.setHtml(song.id + ' - ' + song.title);
        this.timelineEl.setStyle('width','0%');
    },

    play    : function(){
        var song = this.getSong(),
            num = song.id,
            url = Hymnal.Config.VOICE_URL;
        //<debug>
        if(!song){
            Ext.Error.rise('You should call the "setSong" method before playing a song.');
        }
        //</debug>

        if(song.id < 10){
            num = '00' + song.id;
        }else if(song.id < 100){
            num = '0' + song.id;
        }

        if(!this.getVoice()){
            url = Hymnal.Config.TRACKS_URL
        }

        if(url + num + '.mp3' !== this.audio.getUrl()){
            this.audio.setUrl(url + num + '.mp3');
            this.showLoading();
            this.loading = true;
        }
        this.audio.play();

        this.playPauseEl.removeCls('icon-play-circled');
        this.playPauseEl.addCls('icon-pause-circled');
    },

    confirm : function(){
        if(!navigator.onLine){
            Ext.Msg.alert('Sin conexión','Lo sentimos pero para poder escuchar la música es necesario tener conexión a internet.');
            return;
        }else if(!this.getConfirmation()){
            Ext.Msg.confirm('Confirmación','La música utilizará tu conexión a internet, esto podría ocacionarte cargos adicionales.',function(btn){
                if(btn === 'yes'){
                    this.setConfirmation(true);
                    this.showPlayer();
                    this.play();
                }
            },this);
        }else{
            this.showPlayer();
            this.play();
        }
    },

    pause : function(){
        this.playPauseEl.removeCls('icon-pause-circled');
        this.playPauseEl.addCls('icon-play-circled');

        this.audio.pause();
    },

    updateTimeline : function(audio,time){
        var width = 100*time/audio.getDuration();

        this.timelineEl.setStyle('width',width+'%');
        if(this.loading && time > 0){
            this.setTitle(this.getSong());
            this.loading = false;
        }
    },

    isPlaying : function(){
        return this.audio.isPlaying();
    },

    fastForward : function(event){

        //setCurrentTime
    },

    swipePlayer : function(event){
        if(event.direction === 'up'){
            this.showPlayer();
        }else if(event.direction === 'down'){
            this.hidePlayer();
        }
        me.fireEvent('hideplayer');
    },

    showPlayer : function(event){
        var me = this;
        me.knobEl.setStyle('display','none');
        me.element.setStyle('bottom','0px');
        me.show();
        
        me.fireEvent('hideplayer');
    },

    hidePlayer : function(){
        var me = this,
            bottom = '-92px';

        if(me.audio.isPlaying()){
            bottom = '-50px'
        }

        me.knobEl.setStyle('display','block');
        me.element.setStyle('bottom',bottom);
    },

    showLoading : function(){
        this.titleEl.setHtml('<i class="icon-spin5 animate-spin"></i> Cargando...');
    },

    destroy : function(){
        this.audio.destroy();
        this.element.un('tap',this.handleTapEvents,this);
        this.callParent(arguments);
    }
});