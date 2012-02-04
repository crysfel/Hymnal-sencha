/**
 * @class Bleext.data.IndexedDB
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Bleext.data.IndexedDB',{

	version		: '0.1',
	dbName		: 'hymnal',
	database	: {},

	constructor	: function(){
		var me = this;

		me.createDataBase();
		me.createTables();

	},

	createDataBase	: function(){
		var me = this;
			me.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

		if ('webkitIndexedDB' in window) {
			window.IDBTransaction = window.webkitIDBTransaction;
			window.IDBKeyRange = window.webkitIDBKeyRange;
		}

		me.database.indexedDB = {};
		me.database.indexedDB.db = null;

		me.database.indexedDB.onerror = function(e) {
			console.log(e);
		};
    },

    createTables	: function(){
		var me = this;

		me.database.indexedDB.open = function() {
			var request = me.indexedDB.open(dbName);

			request.onsuccess = function(e) {
				var v = me.version,
					db = e.target.result;
				
				me.database.indexedDB.db = db;
				
				// We can only create Object stores in a setVersion transaction;
				if (v != db.version) {
					var setVrequest = db.setVersion(v);

					// onsuccess is the only place we can create Object Stores
					setVrequest.onfailure = me.database.indexedDB.onerror;
					setVrequest.onsuccess = function(e) {
						if(db.objectStoreNames.contains(me.dbName)) {
							db.deleteObjectStore(me.dbName);
						}

						var store = db.createObjectStore(me.dbName,{keyPath: "timeStamp"});
						me.getAll();
					};
				}else{
					me.getAll();
				}
			};
			request.onfailure = me.database.indexedDB.onerror;
		};
    },

	getAll		: function(){
		var me = this,
			db = me.database.indexedDB.db,
			trans = db.transaction(["todo"], IDBTransaction.READ_WRITE);
        var store = trans.objectStore("todo");

        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function(e) {
          var result = e.target.result;
          if(!!result == false)
            return;

          renderTodo(result.value);
          result.continue();
        };

        cursorRequest.onerror = todoDB.indexedDB.onerror;
      };
	}
});