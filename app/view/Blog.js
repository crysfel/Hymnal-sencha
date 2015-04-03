/**
 * @class Hymnal.view.Blog
 * @extends Hymnal.view.Card
 * The blog listing
 */
Ext.define('Hymnal.view.Blog', {
    extend  : 'Hymnal.view.Card',
    requires: [
        'Hymnal.store.Posts',
        'Hymnal.view.Post'
    ],
    xtype   : 'blog',

    config  : {
        layout      : 'card',
        cls         : 'blog',
        toolbar     : [
            {title:'Blog'}
        ],
        items       : [{
            xtype       : 'dataview',
            cls         : 'blog-list',
            itemTpl     : [
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
                        '<p>{preview}</p>',
                        '<div class="btn btn-default">Leer más</div>',
                    '</div>',
                '</div>'
            ].join(''),
            disableSelection : true,
            emptyText   : 'No hay posts que desplegar.',
            store       : {
                type    : 'posts',
                autoLoad: true
            }
        },{
            xtype : 'post'
        }]
    }
});