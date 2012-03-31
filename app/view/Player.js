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
		url : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/'
    },

    initialize   : function(){
        var me = this;
        
        me.callParent();
    }
});