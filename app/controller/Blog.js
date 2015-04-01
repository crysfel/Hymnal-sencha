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
            list : 'blog list',
            view : 'blog post'
        },
        control : {
            'blog list' : {
                itemtap : 'showPost'
            }
        }
    },

    showPost    : function(view,index,target,record) {
        var me = this;

        me.getView().setData(record.getData());

        me.getList().hide();
        me.getView().show();
    }
    
});