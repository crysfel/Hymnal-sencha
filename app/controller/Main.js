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
			},
			searchbtn : {
				selector	: 'main hymnslist #searchbar button[action=searchhymns]'
			},
			configForm	: {
				selector:'formpanel'
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
		fontSize : 40,
		maxFontSize: 50,
		versionUrl : 'http://demos.bleext.com/hymnal/index.php/hymnal/latestVersion',
		mp3Url   : 'http://ia700708.us.archive.org/0/items/HimnarioAdventista/',
		hymnsUrl : 'http://demos.bleext.com/hymnal/index.php/hymnal/findAll'
	},

	init	: function() {
		var me = this;
		
		if(localStorage.getItem('latest-version')){
			//Check if there are changes on the database
			Ext.util.JSONP.request({
				url : me.getVersionUrl(),
				success : function(data){
					var local = +localStorage.getItem('latest-version');

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
	},

	startApp	: function(){
		var me = this,
			carousel,
			home = me.getHome(),
			total = me.hymns.getCount(),
			config = Ext.decode(localStorage.getItem('hymnal-config')),
			songs = me.hymns.getRange(0,2);

		Ext.fly('appLoadingIndicator').destroy();
		Ext.Viewport.add(home);

		if(!config){
			config = {
				font:{
					size:me.getFontSize(),max:me.getMaxFontSize()
				},
				background:'bg-white'
			};
			localStorage.setItem('hymnal-config',Ext.encode(config));
		}else{
			me.setFontSize(config.font.size);
			me.setMaxFontSize(config.font.max);
		}

		me.getConfigForm().setValues({
			fontSize : config.font.size,
			background : config.background
		});
		
		carousel = me.getHymns();

		for(var i=0,len=songs.length;i<len;i++){
			var song = songs[i];
			carousel.addHymn(song);
		}

		carousel.bodyElement.setStyle('font-size',(me.getMaxFontSize() * me.getFontSize()/100)+'px');
		carousel.bodyElement.addCls(config.background);
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
			carousel = me.getHymns(),
			hymn = carousel.down('#hymn-'+record.getId()),
			home = me.getHome(),
			title = me.getTitle();

		if(!hymn){
			var beforePrev = me.db.getById(+record.getId() - 2),
				prev =  me.db.getById(+record.getId() - 1),
				next =  me.db.getById(+record.getId() + 1);

			carousel.removeAll();
			carousel.addHymn(beforePrev);
			carousel.addHymn(prev);
			hymn = carousel.addHymn(record);
			carousel.addHymn(next);
		}

		carousel.setActiveItem(hymn);
		title.setTitle('Himno #'+record.getId());
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
		localStorage.setItem('latest-version',data.version);

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