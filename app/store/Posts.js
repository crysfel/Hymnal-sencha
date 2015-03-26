/**
 * @class Hymnal.store.Posts
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * The blog store
 */

Ext.define('Hymnal.store.Posts',{
    extend      : 'Ext.data.Store',
    alias       : 'store.posts',
    requires    : 'Hymnal.model.Post',

    config      : {
        model       : 'Hymnal.model.Post',

        proxy       : {
            type    : 'ajax',
            url     : Hymnal.Config.BLOG_URL,
            reader  : {
                type            : 'json',
                rootProperty    : 'posts'
            }
        }
    }
});