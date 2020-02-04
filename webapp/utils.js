
module.exports = {
    json: function(res, ret){
        if(typeof ret === 'undefined'){
            res.status(200).json({
                code:'0',
                message: '系统繁忙！'
            });
        }else{
            res.status(200).json(ret);
        }
    },
    checkLogin: function(req, res, callback){
        if(req.cookies.user){
            req.session.user=req.cookies.user;
        }
        if(req.session.user){
            res.locals.user=req.session.user;
        }
        if(!req.session.user){
            res.redirect("/system/login");
        }else{
            callback();
        }
    }
};