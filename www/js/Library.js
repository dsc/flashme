function Library(el, mod){
    this.el = $(el);
    this.cards = [];
    
    if (!mod) {
        mod = Math.randInt(3,9);
        if (mod % 2 === 0) mod += 1;
    }
    this.mod = mod;
    this.idx = this.randIdx();
}

Library.prototype = {
    el    : '',
    mod   : 3,
    idx   : 0,
    cards : [],
    
    add : function(card){ this.cards.push(card); },
    addPair : function(front, back){
        this.add(new Card(front, back));
    },
    len : function(){ return this.cards.length; },
    
    serialize : function(){
        return  toKV({ 
            mod:this.mod, 
            idx:this.idx,
            cards:(this.cards
                .map(function(card){ return card.serialize(); })
                .join('&'))
        });
    },
    load : function(){
        var self = this;
        Library.store().getObject(User.current.uid, function(data){
            if (!data) return;
            
            data.mod = parseInt(data.mod, 10);
            if ( !isNaN(data.mod) ) self.mod = data.mod;
            
            data.idx = parseInt(data.idx, 10);
            if ( !isNaN(data.idx) ) self.idx = data.idx;
            
            reduce(fromKV(data.cards), function(acc, back, front){
                self.addPair(front, back);
            });
            
            self.idx = self.randIdx();
        });
    },
    save : function(){
        Library.store().set(User.current.uid, this.serialize());
    },
    
    card   : function(){ 
        return this.cards[this.idx];
    },
    render : function(){
        if ( !this.len() ) {
            this.el.html('No cards!');
            $('a.new-card').click();
            
        } else {
            if ( !this.el.data('card') ) {
                this.idx = this.randIdx();
            }
            var card = this.card();
            this.el.html( ''+card );
            this.el.data('card', card);
        }
    },
    show : function(idx){
        if ( idx < 0 ) idx += this.len();
        this.idx = idx;
        this.render();
    },
    
    flip : function(){ 
        this.cards[this.idx].flip();
        this.render();
    },
    next : function(){ this.show((this.idx + this.mod) % this.len()); },
    prev : function(){ this.show((this.idx - this.mod) % this.len()); },
    randIdx : function(){ return Math.randInt(0, this.len()-1); },
    
    toString : function(){ return 'Library( idx='+this.idx+', mod='+this.mod+', cards=[ length='+this.len()+' ] )'; }
};


Library.store = function(){
    return Store.acquire('cards');
};