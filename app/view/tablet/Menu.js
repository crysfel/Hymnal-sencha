/**
 * @class Hymnal.view.tablet.Menu
 * @extends Ext.Component
 * The main menu for tablets only
 */
Ext.define('Hymnal.view.tablet.Menu', {
    extend: 'Ext.Component',
    requires: [
        
    ],
    xtype : 'main-menu',
    config: {
        cls     : 'main-menu-tablet',
        html    : [
            '<h1>&nbsp;</h1>',
            '<div class="menu-item active-item" data-id="songlist"><span class="icon-search image-font"></span></div>',
            '<div class="menu-item" data-id="songview"><span class="icon-book image-font"></span></div>',
            '<div class="menu-item" data-id="favorites"><span class="icon-heart image-font"></span></div>',
            '<div class="menu-item" data-id="configurations"><span class="icon-cog image-font"></span></div>'
        ].join('')
    },

    initialize : function(){
        this.callParent(arguments);

        this.element.on('tap',this.handlerMenuItems,this);
    },

    handlerMenuItems : function(event){
        var item = event.getTarget('.menu-item');
        if(item && !event.getTarget('.active-item')){
            this.select(item.dataset.id);
        }
    },

    select : function(id,index){
        this.fireEvent('itemtap',id);

        //setting the active class
        this.element.down('.active-item').removeCls('active-item');
        this.element.select('.menu-item').each(function(item){
            if(item.getAttribute('data-id') === id){
                item.addCls('active-item');
            }
        });
    }
});