/**
 * @class Hymnal.controller.Blog
 * @extends Ext.app.Controller
 *
 * Description
 */

Ext.define('Hymnal.controller.Blog',{
    extend  : 'Ext.app.Controller',
    requires: [
        
    ],

    config  : { 
        refs    : {
            blog : 'blog',
            list : 'blog dataview',
            view : 'blog post'
        },
        control : {
            'blog' : {
                show    : 'onShowView'
            },
            'blog dataview' : {
                itemtap : 'showPost'
            }
        }
    },

    showPost    : function(view,index,target,record) {
        var me = this;

        me.getView().setData(record.getData());

        me.getBlog().setActiveItem(me.getView());
    },

    onShowView  : function(){
        var me = this;
console.log('show');
        if(!navigator.onLine){
            Ext.Msg.alert('Sin conexión','Para poder ver el contenido es necesario tener acceso a internet.');
            return;
        }
        me.getBlog().setActiveItem(me.getList());
    }
    
});