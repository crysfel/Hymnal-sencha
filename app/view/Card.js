/**
 * @class Hymnal.view.Card
 * @extends Ext.Container
 * 
 * This is an abstract class that adds the main toolbar to the container,
 * it handle the custom buttons logic.
 */
Ext.define('Hymnal.view.Card', {
    extend: 'Ext.Container',

    config: {
        toolbar : null,
        slider  : null,
    },

    constructor : function(){
        var tpl = ['<span class="icon-menu"></span>'];

        this.actions = {'icon-menu': 'toggleMenu'};
        if(this.config.toolbar){
            var obj;
            

            for(var i=0,len=this.config.toolbar.length;i<len;i++){
                obj = this.config.toolbar[i];
                if(obj.title){
                    tpl.push('<h1>'+obj.title+'</h1>');
                }

                if(obj.cls){
                    this.actions[obj.cls] = obj.fn;
                    tpl.push('<span class="'+obj.cls+'"></span>');
                }
            }
        }
        
        this.config.items = this.config.items || [];
        this.config.items.unshift({
            xtype : 'component',
            docked: 'top',
            itemId: 'titlebar',
            cls   : 'hymnal-title-bar',
            tpl   : tpl.join(''),
            data  : {}
        });

        this.callParent(arguments);
    },

    initialize : function(){
        this.callParent(arguments);

        this.element.on('tap',this.handleTapEvent,this);
        this.on('painted',this.setSliderCmp,this);
    },

    handleTapEvent : function(event){
        for(var cls in this.actions){
            if(!!event.getTarget('.'+cls)){
                this[this.actions[cls]].call(this);
            }
        }
    },

    toggleMenu : function(){
        this.getSlider().toggleContainer();
    },

    setSliderCmp : function(){
        this.setSlider(this.up('main'));
    }

});