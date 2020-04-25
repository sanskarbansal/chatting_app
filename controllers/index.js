module.exports.index = function(req, res){
    let msg; 
    
    if(req.session.flash && req.session.flash.error && req.session.flash.error.length > 0){
        msg = req.flash('error'); 
    }else{
       msg =  req.flash('message'); 
    }
    res.render('home', {title: "Welcome to Chatting Engine", message: msg}); 
}