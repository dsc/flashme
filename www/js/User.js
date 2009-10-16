function User(name, uid){
    if (name) this.name = name;
    this.uid = uid || Math.cuid();
    this.save();
}

User.prototype = {
    __fields__: [ 'uid', 'name' ],
    uid  : 'LOL',
    name : 'dicknose',
    
    getDict : function(){
        var self = this;
        return reduce(this.__fields__, function(acc,k) {
            acc[k] = self[k];
            return acc;
        }, {});
    },
    save : function(){
        saveCookie('uid', this.uid);
        User.store().set(this.uid, this.getDict());
    },
    toString : function(){ return 'User( name='+this.name+', uid='+this.uid+' )'; }
};


//
// Static
//

User.store = function(){ 
    return Store.acquire('user');
};

User.load = function(fn){
    var uid = cookieKV.uid;
    
    if (uid)
        User.store().getObject(uid, function(u){
            User.current = new User(u.name, u.uid);
            if (fn) fn(User.current);
        }, { 'uid':uid });
    else {
        User.current = new User();
        if (fn) fn(User.current);
    }
};