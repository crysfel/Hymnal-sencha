/**
 * @class Hymnal.view.Favorites
 * @extends Ext.Container
 * 
 */
Ext.define('Hymnal.view.Favorites', {
    extend: 'Hymnal.view.Card',
    xtype : 'favorites',

    config: {
        toolbar     : [
            {title:'Mis Favoritos'},
            {icon:'icon-pencil',fn:'toggleEditMode'}
        ],
        items       : [],
        cls         : 'favorites-view',
        tpl         : [
            '<tpl for="favorites">',
                '<div class="favorite" data-id="{num}">',
                    '<span class="icon-play-circled action-button"></span>',
                    '<span class="icon-cancel-circle action-button"></span>',
                    '<h2 class="hymn-title">{title}</h2>',
                    '<p class="hymn-description">{num} {preview}...</p>',
                '</div>',
            '</tpl>'
        ],
        scrollable   : {
            direction     : 'vertical',
            directionLock : true
      }
    },

    toggleEditMode : function(){
        this.element.toggleCls('favorites-edit-view');
    },

    updateView : function(records){
        this.setData({
            favorites : records
        });
    }
});