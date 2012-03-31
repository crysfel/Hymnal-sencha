/**
 * @class Hymnal.controller.Main
 * @extends Ext.app.Controller
 *
 * Description
 */

Ext.define('Hymnal.controller.Main',{
	extend	: 'Ext.app.Controller',

	config	: {
		models	: [
			'Hymn',
			'Category'
		],
		stores	: [
			'Hymns',
			'Categories'
		],
		views	: [
			'HymnsList',
			'Main',
			'Categories',
			'HymnsCarousel',
			'Configurations'
		],
		refs	: {
			home : {
				xtype		: 'main',
				selector	: 'main',
				autoCreate	: true
			},
			back : {
				selector	: 'main hymnslist button[action=back]'
			},
			result : {
				selector	: 'main hymnslist list'
			},
			hymns : {
				selector	: 'main hymnscarousel'
			},
			audio : {
				selector	: 'main hymnscarousel toolbar audio'
			},
			title : {
				selector	: 'main hymnscarousel toolbar title'
			},
			searchbar : {
				selector	: 'main hymnslist #searchbar'
			},
			searchfield : {
				selector	: 'main hymnslist #searchbar searchfield'
			}
		},
		control : {
			'hymnslist toolbar[docked=top] button[action=search]'	: {
				tap		: 'toggleSearchBar'
			},
			'hymnslist toolbar[docked=top] button[action=searchhymns]' : {
				tap		: 'searchbtn'
			},
			"hymnslist list"	: {
				itemtap	: 'showHymn'
			},
			"hymnslist toolbar[docked=top] textfield"	: {
				action	: 'search',
				blur	: 'blurSearch'
			},
			'hymnscarousel' : {
				activeitemchange : 'changeTitle'
			},
			'hymnscarousel toolbar button[action=play]' : {
				tap : 'playMusic'
			}
		},
		mp3Url   : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/',
		hymnsUrl : 'http://demos.bleext.com/hymnal/index.php/hymnal/findAll'
	},

	init	: function() {
		var me = this;


		me.loadData();
	},

	startApp	: function(){
		var me = this,
			carousel,
			home = me.getHome(),
			hymns = me.hymns.getRange(),
			config = Ext.decode(localStorage.getItem('hymnal-config'));

		Ext.fly('appLoadingIndicator').destroy();
		Ext.Viewport.add(home);

		if(!config){
			config = {fuente:40};
			localStorage.setItem('hymnal-config',Ext.encode(config));
		}
		
		carousel = me.getHymns();
		for(var i=0,len=hymns.length;i<len;i++){
			var hymn = hymns[i];
			hymn.set('size',config.fuente);
			carousel.addHymn(hymn);
		}
	},

	toggleSearchBar		: function(button,event){
		var toolbar = this.getSearchbar();

		if(toolbar.isHidden()){
			toolbar.show();
		}else{
			toolbar.hide();
		}
	},

	changeTitle	: function(container,newValue,oldValue){
		var me = this,
			title = me.getTitle(),
			id = +newValue.config.model.getId(),
			config = Ext.decode(localStorage.getItem('hymnal-config'));

		title.setTitle('Hymno #'+id);

		Ext.fly(newValue.renderElement.query('h3')[0]).setStyle('font-size',(config.fuente+10)+'%');
		Ext.fly(newValue.renderElement.query('p')[0]).setStyle('font-size',config.fuente+'%');
	},

	showHymn	: function(list,index,target,record){
		var me = this,
			carousel = me.getHymns(),
			hymn = carousel.down('#hymn-'+record.getId()),
			home = me.getHome(),
			title = me.getTitle();

		carousel.setActiveItem(hymn);
		title.setTitle('Hymno #'+record.getId());
		home.setActiveItem(1);
		
	},

	loadData	: function(){
		var me = this,
			data = localStorage.getItem('hymns');

		if(!data){
			Ext.util.JSONP.request({
				url         : me.getHymnsUrl(),
				callback    : me.saveData,
				scope       : me,
				callbackKey : 'callback'
			});
		}else{
			me.importDataToStore(Ext.decode(data));
		}
	},

	saveData	: function(success, data){
		localStorage.setItem('hymns',Ext.encode(data));

		this.importDataToStore(data);
	},

	importDataToStore : function(data){
		this.hymns = Ext.create('Hymnal.store.Hymns',{
			data : data
		});
		this.db = Ext.create('Hymnal.store.Hymns',{
			data : data
		});
		
		this.startApp();
	},

	searchbtn	: function(btn){
		this.search(this.getSearchfield());
	},
	search		: function(field,event){
		var me = this,
			filters = [],
			list = me.getResult(),
			store = list.getStore(),
			words = field.getValue().split(' '),
			sortByNumber = false;
		
		Ext.each(words,function(word){
			//if the word is bigger than three characters
			if(word.length > 3){
				var rg = new RegExp(word,'i');

				filters.push({property:'titlePlain',value:rg});
			}else if(+word){ //if is a number
				filters.push({property:'id',value:word});
				sortByNumber = true;
			}
		});

		if(filters.length > 0){
			me.hymns.clearFilter();
			me.hymns.filter(filters);
			store.removeAll();
			store.setData(me.hymns.getRange());
			if(sortByNumber){
				store.setGrouper(null);
				list.setGrouped(false);
				store.sort('id','ASC');
			}else{
				store.setGrouper({
					groupFn : function(record){
						return record.get('titlePlain')[0];
					}
				});
				list.setGrouped(true);
				store.sort('title','ASC');
			}
			field.blur();
		}
	},

	playMusic	: function(btn){
		var me = this,
			audio = me.getAudio(),
			hymn = me.getHymns().getActiveItem(),
			model = hymn.config.model,
			number = model.getId(),
			file = number<10?'00'+number:(number < 100?'0'+number:number);

		if(me.nowPlaying === number){
			if(audio.isPlaying()){
				audio.pause();
				btn.setIconCls('arrow_right');
			}else{
				audio.play();
				btn.setIconCls('pause');
			}
		}else{
			audio.setUrl(me.getMp3Url()+file+'.mp3');
			audio.play();
			btn.setIconCls('pause');
			me.nowPlaying = number;
		}
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