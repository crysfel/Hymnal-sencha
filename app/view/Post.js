/**
 * @class Hymnal.view.Post
 * @extends Ext.Container
 * The post view
 */
Ext.define('Hymnal.view.Post', {
    extend: 'Ext.Container',
    requires: [
        
    ],
    xtype : 'post',

    config: {
        cls         : 'blog-post',
        scrollable   : {
            direction     : 'vertical',
            directionLock : true
        },
        tpl     : [
            '<div class="custom-panel">',
                '<tpl if="assetType == \'Image\'">',
                    '<div class="image-cover" style="background-image:url({asset})"></div>',
                '</tpl>',
                '<tpl if="assetType == \'Video\' &amp; youtube != \'\'">',
                    '<div class="video-wrapper">',
                        '<iframe src="https://www.youtube.com/embed/{youtube}?showinfo=0" frameborder="0" allowfullscreen></iframe>',
                    '</div>',
                '</tpl>',
                '<div class="custom-panel-detail">',
                    '<h2>{title}</h2>',
                    '<p class="blog-meta">Por: <em>{author.name}</em> | {time}',
                    '<p>{content}</p>',
                '</div>',
            '</div>'
        ].join('')
    }
});