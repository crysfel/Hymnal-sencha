/**
 * @class Hymnal.view.SongList
 * @extends Ext.dataview.List
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.SongList',{
    extend      : 'Hymnal.view.Card',
    xtype       : 'songlist',
    requires	: [
		'Ext.field.Search',
		'Ext.dataview.List',
		'Hymnal.store.Songs'
    ],

    config		: {
		layout		: 'card',
        cls         : 'song-list',
        toolbar     : [
            {title:Ext.os.is('Phone')?'Himnario Adventista':'Indice'},
            {icon:'icon-search',fn:'showSearch'}
        ],
		items		: [{
			xtype	: 'toolbar',
			docked	: 'top',
			itemId	: 'searchbar',
            hidden  : true,
            padding : '0 10px',
			items	: [{
				xtype	: 'searchfield',
				flex	: 1,
				placeHolder	: 'Busque por palabras o número'
			}]
		},{
            xtype       : 'list',
            cls         : 'hymn-list',
            itemTpl     : '<h2 class="hymn-title">{title}</h2><p class="hymn-description"><span class="hymn-number">{id}</span> {preview}...</p>',
            disableSelection : true,
            emptyText   : 'No se encontraron himnos con esas palabras o número!',
            infinite    : true,
            variableHeights: true,
            store       : {
                type    : 'songs'
            }
		}]
    },

    showSearch : function(){
        if(!this.searchBar){
            this.searchBar = this.down('#searchbar');
        }

        this.searchBar.setHidden(!this.searchBar.isHidden());
    }
});