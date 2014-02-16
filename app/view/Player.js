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
    extend      : 'Ext.Container',
    alias       : 'widget.player',

    config		: {
        cls     : 'player-container',
		tpl     : [
            '<div class="player-controls">',
                '<span class="icon-backward-circled"></span>',
                '<span class="icon-play-circled"></span>',
                '<span class="icon-forward-circled"></span>',
                '<span class="icon-note-beamed"></span>',
                '<span class="music-singer">',
                    '<span class="icon-user"></span>',
                    '<span class="icon-note"></span>',
                '</span>',
            '</div>'
        ].join(''),
        data    : {}
    },

    initialize   : function(){
        var me = this;
        
        me.callParent();
    }
});