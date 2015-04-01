
Ext.define('Hymnal.overrides.Ajax', {
    override : 'Ext.Ajax',

    request  : function(){
        //@TODO get credentails from local storage
        this.setDefaultHeaders({
            'X-User-Email'  : 'test@bleext.com',
            'X-User-Token'  : '-Pvv7zs2gJmpqTee-Bnc'
        });

        this.callParent(arguments);
    }
});