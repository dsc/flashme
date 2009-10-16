(function(){

String.prototype.padLeft = function(size, prefix) {
    prefix = prefix || " ";
    var s = ''+this;
    while (s.length < size) s = prefix + s;
    return s;
};


Math.randInt = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Math.cuid = function(){
    var t = Math.floor((new Date()).getTime()/1000),
        r = (Math.random() * 100000000),
        lb = Math.floor(Math.random() * 15);
    
    r = (r << 4) | lb;
    return t.toString(16) + r.toString(16).padLeft(8, '0');
};

var EXPIRES = 'Sun, 24-Mar-2024 11:11:11 GMT';
window.saveCookie = saveCookie;
function saveCookie(k, v, expires){
    expires = expires || EXPIRES;
    document.cookie = (k+'='+v+'; expires='+expires+';');
    return v;
}

window.cookieKV = fromKV(document.cookie, '; ');

})();

