function Card(front, back){
    this.front = front || ' ';
    this.back  = back || ' ';
}

Card.prototype = {
    front : ' ',
    back  : ' ',
    side  : 'front',
    
    flip  : function(){
        this.side = (this.side === 'front' ? 'back' : 'front');
    },
    _enc : function(s){ 
        var amp = '%26', eq = '%3d';
        return s.replace('&', amp).replace('=', eq);
    },
    serialize : function(){
        return  this._enc(this.front) +
                '=' + 
                this._enc(this.back);
    },
    toString : function(){
        return this[this.side];
    }
};