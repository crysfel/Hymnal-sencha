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
        'Ext.Audio'
    ],

    config		: {
        song    : null,
        current : null,
        showAnimation : 'slide',
        hideAnimation : 'slideOut',
        cls     : 'player-container',
        html    : [
            '<div class="player-controls">',
                '<div class="player-status-bar">',
                    '<div class="player-timeline" style="width:0%"></div>',
                '</div>',
                '<div class="player-song-title">&nbsp;</div>',
                '<span class="player-control-previous icon-backward-circled"></span>',
                '<span class="player-control-play icon-play-circled"></span>',
                '<span class="player-control-next icon-forward-circled"></span>',
                '<span class="icon-note-beamed player-play-track player-selected"></span>',
                '<span class="music-singer player-play-song">',
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
        me.songEl = me.element.down('.player-play-song');
        me.playPauseEl = me.element.down('.player-control-play');

        me.element.on('tap',me.handleTapEvents,me);
        me.audio.on('timeupdate',Ext.Function.createThrottled(this.updateTimeline,1000,this));
        me.audio.on('ended',this.pause,this);
    },

    applySong : function(song){
        if(!this.audio.isPlaying()){
            this.setTitle(song);
        }
        return song;
    },

    handleTapEvents : function(event){
        var me = this;

        if(event.getTarget('.music-singer')){
            me.songEl.addCls('player-selected');
            me.trackEl.removeCls('player-selected');
        }else if(event.getTarget('.player-play-track ')){
            me.trackEl.addCls('player-selected');
            me.songEl.removeCls('player-selected');
        }else if(event.getTarget('.player-control-play')){
            me.toggleReproduction();
        }else if(event.getTarget('.player-control-previous')){
            me.playPrevious();
        }else if(event.getTarget('.player-control-next')){
            me.playNext();
        }
    },

    toggleReproduction : function(){
        if(this.audio.isPlaying()){
            this.pause();
        }else{
            this.play();
        }
    },

    playPrevious : function(){

    },

    playNext : function(){

    },

    setTitle : function(song){
        this.titleEl.setHtml(song.id + ' - ' + song.title);
        this.timelineEl.setStyle('width','0%');
    },

    play    : function(){
        var song = this.getSong(),
            num = song.id;
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
        this.audio.setUrl(Hymnal.Config.SONGS_URL + num + '.mp3');
        this.audio.play();

        this.playPauseEl.removeCls('icon-play-circled');
        this.playPauseEl.addCls('icon-pause-circled');
    },

    pause : function(){
        this.playPauseEl.removeCls('icon-pause-circled');
        this.playPauseEl.addCls('icon-play-circled');

        this.audio.pause();
    },

    updateTimeline : function(audio,time){
        var width = 100*time/audio.getDuration();
        this.timelineEl.setStyle('width',width+'%');
    },

    isPlaying : function(){
        return this.audio.isPlaying();
    },

    destroy : function(){
        this.audio.destroy();
        this.element.un('tap',this.handleTapEvents,this);
        this.callParent(arguments);
    }
});