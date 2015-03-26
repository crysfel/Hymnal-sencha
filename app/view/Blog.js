/**
 * @class Hymnal.view.Blog
 * @extends Hymnal.view.Card
 * The blog listing
 */
Ext.define('Hymnal.view.Blog', {
    extend  : 'Hymnal.view.Card',
    requires: [
        'Hymnal.store.Posts'
    ],
    xtype   : 'blog',

    config  : {
        cls         : 'blog',
        toolbar     : [
            {title:'Blog'}
        ],
        items       : [{
            xtype       : 'list',
            cls         : 'blog-list',
            itemTpl     : [
                '<div class="custom-panel">',
                    '<tpl if="assetType == \'Image\'">',
                        '<div class="image-cover" style="background-image:url({asset})"></div>',
                    '</tpl>',
                    '<tpl if="assetType == \'Video\' &amp; youtube != \'\'">',
                        '<div class="video-wrapper">',
                            '<iframe src="https://www.youtube.com/embed/{youtube}" frameborder="0" allowfullscreen></iframe>',
                        '</div>',
                    '</tpl>',
                    '<div class="custom-panel-detail">',
                        '<h2>{title}</h2>',
                        '<p>Por: {author.name} | {time} | 0 Comentarios</p>',
                        '<p>{content}</p>',
                    '</div>',
                '</div>'
            ].join(''),
            disableSelection : true,
            emptyText   : 'No hay posts que desplegar.',
            store       : {
                type    : 'posts',
                autoLoad: true
            }
        }]
    }
});