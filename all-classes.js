/*
Copyright(c) 2011 Company Name
*/
/**
 * @class Hymnal.controller.Home
 * @extends Ext.app.Controller
 *
 * Description
 */
Ext.define('Hymnal.controller.Home',{
	extend	: 'Ext.app.Controller',
	models	: [
		'Hymn'
	],
	stores	: [
		'Hymns',
		'Categories'
	],
	views	: [
		'HymnsList',
		'Home',
		'Categories'
	],
	config	: {
		refs	: {
			home : {
				xtype		: 'home',
				selector	: 'home',
				autoCreate	: true
			},
			back : {
				selector	: 'home hymnslist button[action=back]'
			},
			result : {
				selector	: 'home hymnslist list'
			},
			hymn : {
				selector	: 'home hymnslist #hymn'
			},
			title : {
				selector	: 'hymnslist toolbar title'
			},
			searchbar : {
				selector	: 'home hymnslist #searchbar'
			}
		}
	},

	init	: function() {
		var me = this;

		me.control({
			"hymnslist toolbar[docked=top] button[action=search]"	: {
				tap		: me.toggleSearchBar
			},
			"hymnslist list"	: {
				select	: me.showHymn
			},
			"hymnslist toolbar[docked=top] button[action=back]"	: {
				tap		: me.showResult
			},
			"hymnslist toolbar[docked=top] textfield"	: {
				action			: me.search,
				blur			: me.blurSearch
			}
		});

		me.startApp();
	},

	startApp	: function(){
		var me = this,
			home = me.getHome();

		Ext.Viewport.add(home);
		//me.loadData();
	},

	toggleSearchBar		: function(button,event){
		var toolbar = this.getSearchbar();

		if(toolbar.isHidden()){
			toolbar.show();
		}else{
			toolbar.hide();
		}
	},

	showHymn	: function(list,record){
		this.getTitle().setTitle("Himno #"+record.get('id'));
		this.getHymn().setData(record.data);
		this.getResult().hide();
		this.getHymn().show();
		this.getBack().show();
		this.getSearchbar().hide();

	},

	showResult	: function(){
		this.getTitle().setTitle("Índice por títulos");
		this.getResult().show();
		this.getHymn().hide();
		this.getBack().hide();
	},

	loadData	: function(){
		
	},

	search		: function(field,event){
		var me = this,
			filters = [],
			store = me.getResult().getStore();
			words = field.getValue().split(' ');
		
		Ext.each(words,function(word){
			var rg = new RegExp(word,'i');

			//filters.push({property:'title',value:rg});
			filters.push({property:'titlePlain',value:rg});
		});
		
		store.clearFilter();
		store.filter(filters);
		field.blur();
	},

	clearSearch	: function(field){
		this.getResult().getStore().clearFilter();
	},

	blurSearch	: function(field){
		if(field.getValue() === ""){
			this.clearSearch();
		}
	}

});
/**
 * @class Hymnal.view.Categories
 * @extends Ext.Panel
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.Categories',{
    extend      : 'Ext.Panel',
    alias       : 'widget.categories',

    config		: {
		items	: [{
			xtype	: 'toolbar',
			docked	: 'top',
			title	: 'Índice por temas'
		},{
			xtype		: 'list',
			itemTpl		: '<p>{name}</p>',
			store		: 'Hymnal.store.Categories'
		}]
    }
});
/**
 * @class Hymnal.model.Hymn
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('Hymnal.model.Hymn',{
    extend      : 'Ext.data.Model',

	config		: {
		fields		: [
			"id","title",
			{name:"titlePlain",mapping:'title_plain'},
			"preview","content","musicImage"
	    ]
	}
});
/**
 * @class Hymnal.view.Home
 * @extends Ext.tab.TabPanel
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.Home',{
    extend      : 'Ext.tab.Panel',
    alias       : 'widget.home',

    config		: {
		tabBar			: {
			layout	: {
				pack	: 'center',
				align	: 'center'
			},
			docked		: 'bottom'
		},
		items			: [{
			title	: "Indice",
			layout	: 'fit',
			items	: [{
				xtype	: 'hymnslist'
			}],
			iconCls	: 'search'
		},{
			title	: "Temas",
			items	: {
				xtype	: 'categories'
			},
			iconCls	: 'bookmarks'
		},{
			title	: "Mas",
			html	: "Config",
			iconCls	: 'more'
		}]
    }
});
/**
 * @class Hymnal.store.Hymns
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.store.Hymns',{
    extend      : 'Ext.data.Store',
    alias       : 'store.hymns',

    config      : {
        model       : 'Hymnal.model.Hymn',

        sorters     : 'titlePlain',
        autoLoad    : true,
        proxy       : {
            type    : 'ajax',
            url     : Hymnal.BASE_PATH+'index.php/hymnal/findAll',
            reader  : {
                type            : 'json',
                rootProperty    : 'data'
            }
        },

        grouper  : {
            groupFn : function(record){
                return record.get('titlePlain')[0];
            }
        }
    }
});
/**
 * @class Hymnal.view.HymnsList
 * @extends Ext.dataview.List
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.view.HymnsList',{
    extend      : 'Ext.Panel',
    alias       : 'widget.hymnslist',

    config		: {
		layout		: 'card',
		items		: [{
			docked	: 'top',
            xtype	: 'toolbar',
            items	: [{
				text	: 'Volver',
				ui		: 'back',
				action	: 'back',
				hidden	: true
            },{
				xtype	: 'spacer'
            },{
				xtype	: 'title',
				title	: 'Índice por títulos'
            },{
				xtype: 'spacer'
            },{
				iconMask: true,
				iconCls	: 'search',
				action	: 'search',
				clearIcon : true
            }]
		},{
			xtype	: 'toolbar',
			docked	: 'top',
			hidden	: true,
			itemId	: 'searchbar',
			items	: [{
				xtype	: 'searchfield',
				flex	: 1,
				height	: 27,
				placeHolder	: 'Búsque por palabras o número'
			},{
				xtype	: 'button',
				text	: 'Cancelar'
			}]
		},{
			xtype		: 'list',
			itemTpl		: '<h2 class="hymn-title">{title}</h2><p class="hymn-description">{id} {preview}...</p>',
			grouped		: true,
			indexBar	: {
				docked	: 'right',
				overlay	: true,
				alphabet: true
			},
			store		: {
				type	: 'hymns'
			}
		},{
			cls		: 'hymn-content',
			itemId	: 'hymn',
			scrollable : 'vertical',
			tpl		: ['<h3>{title}</h3><p>{content}</p>']
		}]
    }
});
/**
 * @class Hymnal.store.Categories
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Hymnal.store.Categories',{
    extend      : 'Ext.data.Store',

    config		: {
	    model		: 'Hymnal.model.Hymn',

	    //autoLoad	: true,
	    proxy		: {
			type	: 'ajax',
			url		: Hymnal.BASE_PATH+'index.php/hymnal/findCategories',
			reader	: {
				type			: 'json',
				rootProperty	: 'data'
			}
	    }
	}
});


