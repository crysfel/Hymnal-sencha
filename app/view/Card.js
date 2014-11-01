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
        var tpl = [];

        if(Ext.os.is('Phone')){
            tpl = ['<span class="icon-menu toggleMenu"></span>'];
        }

        this.actions = {'toggleMenu': true};
        if(this.config.toolbar){
            var obj;
            

            for(var i=0,len=this.config.toolbar.length;i<len;i++){
                obj = this.config.toolbar[i];
                if(obj.title){
                    tpl.push('<h1>'+obj.title+'</h1>');
                }

                if(obj.fn){
                    this.actions[obj.fn] = true;
                    tpl.push('<span class="'+obj.icon+' '+obj.fn+'"></span>');
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
        for(var fn in this.actions){
            if(!!event.getTarget('.'+fn)){
                this[fn].call(this);
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