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