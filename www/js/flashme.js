$(function(){
    var doc = $(document),
        card  = $('#card'),
        lib   = window.lib = new Library('#card'), you,
        prev  = function(evt){ false && console.log('prev'); lib.prev(); },
        next  = function(evt){ false && console.log('next'); lib.next(); },
        space = function(evt){ false && console.log('flip'); lib.flip(); };
    
    doc.bind('keydown', {combi:'A', disableInInput: true},     prev);
    doc.bind('keydown', {combi:'left', disableInInput: true},  prev);
    doc.bind('keydown', {combi:'L', disableInInput: true},     next);
    doc.bind('keydown', {combi:'right', disableInInput: true}, next);
    doc.bind('keydown', {combi:'space', disableInInput: true}, space);
    
    var timer;
    function autosave(){
        // console.log('(autosave)');
        you.save();
        lib.save();
        if (timer) clearTimeout(timer);
        timer = setTimeout(autosave, cookieKV.autosave || 15000);
    }
    
    $('fieldset.new-card form').submit(function(evt){
        evt.preventDefault();
        var form = $(this);
        lib.addPair( form.find('input.front').val(), form.find('input.back').val() );
        lib.save();
        
        if ( lib.len() === 1 )
            lib.render();
        
        form.parent().hide();
    });
    
    function showNewCardForm(evt){
        evt.preventDefault();
        var el = $('#new-card-dialog');
        el.find('input.front').val('');
        el.find('input.back').val('');
        el.css({
            top: '300px',
            left: ($(document).width() - el.width()) / 2
        });
        el.show();
        el.find('input.front').get(0).focus();
    }
    
    $('a.new-card').click(showNewCardForm);
    doc.bind('keydown', {combi:'N', disableInInput: true}, showNewCardForm);
    
    User.load(function(u){
        you = window.you = u;
        lib.load();
        
        lib.render();
        autosave();
    });
    
    
    // console.log("EGG LAID 4U");
    // console.log('you='+you+' with lib='+lib);
});



