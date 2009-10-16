// u.js -- Dave's Micro-Basis
// This whole file should be sealed in your closure before your code.

var undefined,
    isIE = !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
    enc = encodeURIComponent, dec = decodeURIComponent;

var slice = function(a){ 
    var aslice = Array.prototype.slice;
    return aslice.apply(a, aslice.call(arguments, 1));
};

var bind = function( fn, context ){
    var args = slice(arguments), fn = args.shift(), context = args.shift(); 
    return function(){
        return fn.apply( context, args.concat(slice(arguments)) );
    };
};

var reduce = function( o, fn, acc, cxt ){
    if ( !o )
        return acc;
    
    if ( o instanceof Array )
        for( var i = 0, len = o.length, v = o[0]; i < len; v = o[++i] )
            acc = fn.call( cxt || o, acc, v, i, o );
    else 
        for ( var name in o )
            acc = fn.call( cxt || o, acc, o[ name ], name, o );
    
    return acc;
};

var toKV = function(o,del){
    return reduce(o, function(acc, v, k){
        acc.push( enc(k) + '=' + enc(v) ); return acc;
    }, []).join(del !== undefined ? del : "&");
};

var fromKV = function(q,del){
    return reduce((q || '').split(del || '&'), function(acc, pair){
        var kv = pair.split('='), k = kv[0], v = kv[1];
        if (k) acc[k] = dec(v);
        return acc;
    }, {});
};

var extend = function( A, B ){ return reduce(B, function(o, v, k){ o[k] = v; return o; }, A); };

var listen = function(obj, evt, fn){
    if ( !obj )
        return;
    if ( obj.attachEvent )
        obj.attachEvent('on'+evt, fn);
    else
        obj.addEventListener(evt, fn, false);
};

var unlisten = function(obj, evt, fn){
    if ( !obj )
        return;
    if ( obj.detachEvent )
        obj.detachEvent('on'+evt, fn);
    else
        obj.removeEventListener(evt, fn, false);
};

// end u.js //
