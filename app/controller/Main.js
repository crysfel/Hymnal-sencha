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
			'HymnView',
			'Configurations'
		],
		refs	: {
			home : {
				xtype		: 'main',
				selector	: 'main',
				autoCreate	: true
			},
			back : {
				selector	: 'hymnslist button[action=back]'
			},
			result : {
				selector	: 'hymnslist list'
			},
			hymns : {
				selector	: 'hymnview'
			},
			audio : {
				selector	: 'hymnview toolbar audio'
			},
			title : {
				selector	: 'hymnview toolbar title'
			},
			searchbar : {
				selector	: 'hymnslist #searchbar'
			},
			searchfield : {
				selector	: 'hymnslist #searchbar searchfield'
			},
			searchbtn : {
				selector	: 'hymnslist #searchbar button[action=searchhymns]'
			},
			configForm	: 'formpanel'
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
				blur	: 'blurSearch',
				focus	: 'focusSearch'
			},
			'hymnscarousel' : {
				activeitemchange : 'changeTitle'
			},
			'hymnscarousel toolbar button[action=play]' : {
				tap : 'playMusic'
			}
		},
		fontSize : Ext.os.deviceType.toLowerCase()==='tablet'?50:40,
		maxFontSize: 50,
		versionUrl : 'http://demos.bleext.com/hymnal/index.php/hymnal/latestVersion',
		mp3Url   : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/',
		hymnsUrl : 'http://demos.bleext.com/hymnal/index.php/hymnal/findAll'
	},

	init	: function() {
		var me = this;

		me.loadData();
		/*
		// We need to refactor this code, we should not check for new versions
		// at startup because this slow the opening, we should check for new versions later
		// probably using a timeout and run the jsonp call after 1 or 2 mins of using the app

		if(localStorage.getItem('latest-version') && localStorage.getItem('latest-update')){
			//Check if there are changes on the database
			//every two weeks
			var today = new Date(),
				latest = localStorage.getItem('latest-update'),
				twoWeeksAgo = new Date().setDate(today.getDate() - 14);

			if(Ext.Date.parse(latest,'Y-m-d H:i:s') < twoWeeksAgo){
				
				Ext.util.JSONP.request({
					url : me.getVersionUrl(),
					success : function(data){
						var local = +localStorage.getItem('latest-version');

						localStorage.setItem('latest-update',Ext.Date.format(new Date(),'Y-m-d H:i:s'));
						if(+data.version > local){
							Ext.Msg.confirm('Actualiación','La base de datos del himnario se ha actualizado, deseas descargarla ahora?',function(btn){
								if(btn === 'yes'){
									localStorage.removeItem('hymns');
								}
								me.loadData();
							});
						}else{
							me.loadData();
						}
					},
					failure : function(){
						me.loadData();
					}
				});
			}else{
				me.loadData();
			}
			
		}else{
			me.loadData();
		}
		*/
	},

	startApp	: function(){
		var me = this,
			carousel,
			list,
			home = me.getHome(),
			songs = me.hymns.getRange(0,2);

		Ext.fly('appLoadingIndicator').destroy();
		Ext.Viewport.add(home);

		//carousel = me.getHymns();
		list = me.getResult();
		list.setStore(me.hymns);

		// for(var i=0,len=songs.length;i<len;i++){
		// 	var song = songs[i];
		// 	carousel.addHymn(song);
		// }

		// carousel.bodyElement.setStyle('font-size',(me.getMaxFontSize() * me.getFontSize()/100)+'px');
		// carousel.bodyElement.addCls(config.background);
		Ext.getBody().addCls(Ext.os.deviceType.toLowerCase()+'-styles');
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
			carousel = me.getHymns(),
			next;

		title.setTitle('Himno #'+id);

		if(newValue && oldValue){
			var direction = id < oldValue.config.model.getId()?'left':'right';
			
			if(direction === 'right'){
				next = me.db.getById(id + 2);
				if(next && !carousel.down('#hymn-'+next.getId())){
					carousel.addHymn(next);
				}
			}else{
				next = me.db.getById(id - 2);
				if(next && !carousel.down('#hymn-'+next.getId())){
					carousel.insertHymn(1,next);
					carousel.setActiveItem(carousel.down('#hymn-'+id));
				}
			}
			carousel.refresh();
		}
	},

	showHymn	: function(list,index,target,record){
		var me = this,
			home = me.getHome();

		home.list.select(1); //force selection

		var carousel = me.getHymns();
		carousel.setHymn(record);
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
		localStorage.setItem('latest-version',data.version);
		localStorage.setItem('latest-update',Ext.Date.format(new Date(),'Y-m-d H:i:s'));

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
			if(+word){ //if is a number
				filters.push({property:'id',value:word});
				sortByNumber = true;
			}else if(word.length >= 3){ //if the word is bigger than three characters
				var rg = new RegExp(word,'i');

				filters.push({property:'titlePlain',value:rg});
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

	focusSearch : function(){
		this.getSearchbtn().show();
	},

	blurSearch	: function(field){
		if(field.getValue() === ""){
			this.clearSearch();
			this.getSearchbtn().hide();
		}
	}
});