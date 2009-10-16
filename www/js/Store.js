function Store(name, store){
    this.name = name;
    this._store = store || Store.acquire(name);
}

Store.prototype = {
    _store : null,
    
    get : function(k, fn, def){
        this._store.get(k, Store.ok(fn, def));
    },
    getObject : function(k, fn, def){
        this.get(k, function(v){ fn(fromKV(v || '')); }, def || '');
    },
    set : function(k,v){
        if (!(typeof v === 'string'))
            v = (v.constructor === Object ? toKV(v) : ''+v);
        this._store.set(k, v);
        return v;
    },
    remove : function(k, fn){
        return this._store.remove(k, fn);
    },
    
    save : function(){ return this._store.save(); },
    toString : function(){ return 'Store( name='+this.name+' )'; }
};

Store.ok = function(fn, def){
    return function(ok,v){
        if (fn)
            fn(ok ? v : def || '');
    };
};

Store._stores = {};
Store.acquire = function(name, options){
    if (name.indexOf('flashme-') !== 0)
        name = 'flashme-'+name;
    
    if ( Store._stores[name] )
        return Store._stores[name];
        
    else
        return ( Store._stores[name] = new Store(name, new Persist.Store( name, extend({ swf_path: 'assets/persist.swf' }, options || {}) )) );
};
Store.saveAll = function(){
    reduce(Store._stores, function(_, store){ store.save(); });
};

$(window).bind('unload', function(evt){
    Store.saveAll();
});