
Ext.define('Hymnal.overrides.Ajax', {
    override : 'Ext.Ajax',

    request  : function(){
        //@TODO get credentails from local storage
        this.setDefaultHeaders({
            'X-User-Email'  : '',
            'X-User-Token'  : ''
        });

        this.callParent(arguments);
    }
});