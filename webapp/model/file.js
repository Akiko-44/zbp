var utils = require('../utils');
var formidable = require('formidable');
var fs = require('fs');
var qiniu = require("qiniu");

var file = {
    add: function(req, res, next){
    	var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        //保留后缀
        form.keepExtensions = true;
        form.maxFieldsSize = 100 * 1024 * 1024;

        form.parse(req, function(err, fields, files) {
            if (err) {
                utils.json(res, {
                    code: 0,
                    success: false,
                    message: '上传失败！'
                });
                return;
            }
            var type = files.cloudfile.name.split('.');
            
            var name = new Date().getTime() + "_" + files.cloudfile.name;
            var previewEl = fields.previewEl;
            
            var accessKey = 'TaQMaS7R-mEilxonMgrqWNMD4j6GpeVOIZgdes5b';
        	var secretKey = '8gAihG5BzMBZ7L8Edmu-AhTZtCd14vZwCcqgxZda';
        	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        	
        	bucket = 'gac-bucket01';
        	var options = {
        		scope: bucket
    		};
    		var putPolicy = new qiniu.rs.PutPolicy(options);
    		var uploadToken = putPolicy.uploadToken(mac);
    		
    		var config = new qiniu.conf.Config();
    		// 空间对应的机房
    		config.zone = qiniu.zone.Zone_z2;
        	
    		var formUploader = new qiniu.form_up.FormUploader(config);
    		var putExtra = new qiniu.form_up.PutExtra();
    		var key = name;
    		// 文件上传
    		formUploader.putFile(uploadToken, key, files.cloudfile.path, putExtra, function(respErr, respBody, respInfo) {
    		  if (respErr) {
    		    throw respErr;
    		  }
    		  if (respInfo.statusCode == 200) {
    		    fs.unlinkSync(files.cloudfile.path);
    		    
                var src = '<script>';
                if(previewEl){
                	src += 'var img=top.document.getElementById("'+previewEl+'");img.src="http://image.gacjc.com/'+name+'";img.setAttribute("name","http://image.gacjc.com/'+name+'");';
                }
                src += '</script>';
                res.status(200).send(src);
    		    
    		  } else {
    		    utils.json(res, {
                    code: 200,
                    success: false,
                    message: '上传失败！'
                });
    		  }
    		});

        });
    	

    },
    
    qiniu: function(req, res, next){
    	var name = req.body.name;
    	if(name == ""){
    		utils.json(res, {
                code: 200,
                success: false,
                message: '上传失败'
            });
    		return;
    	}
    	
    	var accessKey = 'TaQMaS7R-mEilxonMgrqWNMD4j6GpeVOIZgdes5b';
    	var secretKey = '8gAihG5BzMBZ7L8Edmu-AhTZtCd14vZwCcqgxZda';
    	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    	
    	bucket = 'gac-bucket01';
    	var options = {
    		scope: bucket
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken = putPolicy.uploadToken(mac);
		
		var config = new qiniu.conf.Config();
		// 空间对应的机房
		config.zone = qiniu.zone.Zone_z2;
    	
		var localFile = 'public/upload/temp/' + name;
		var formUploader = new qiniu.form_up.FormUploader(config);
		var putExtra = new qiniu.form_up.PutExtra();
		var key = name;
		// 文件上传
		formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
		  if (respErr) {
		    throw respErr;
		  }
		  if (respInfo.statusCode == 200) {
		    fs.unlinkSync(localFile);
            utils.json(res, {
                code: 200,
                data: "http://image.gacjc.com/" + name,
                success: true,
                message: '上传成功！'
            });
		  } else {
		    utils.json(res, {
                code: 200,
                success: false,
                message: '上传失败！'
            });
		  }
		});
    	
    },
    
    upload: function(req, res, next){
    	
    	var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        //保留后缀
        form.keepExtensions = true;
        form.maxFieldsSize = 100 * 1024 * 1024;

        form.parse(req, function(err, fields, files) {
            if (err) {
                utils.json(res, {
                    code: 0,
                    success: false,
                    message: '上传失败！'
                });
                return;
            }
            var type = files.cloudfile.name.split('.');
            
            var name = new Date().getTime() + "_" + Math.random().toString(16).substr(2) + '.' + type[1];
            
            var accessKey = 'TaQMaS7R-mEilxonMgrqWNMD4j6GpeVOIZgdes5b';
        	var secretKey = '8gAihG5BzMBZ7L8Edmu-AhTZtCd14vZwCcqgxZda';
        	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        	
        	bucket = 'gac-bucket01';
        	var options = {
        		scope: bucket
    		};
    		var putPolicy = new qiniu.rs.PutPolicy(options);
    		var uploadToken = putPolicy.uploadToken(mac);
    		
    		var config = new qiniu.conf.Config();
    		// 空间对应的机房
    		config.zone = qiniu.zone.Zone_z2;
        	
    		var formUploader = new qiniu.form_up.FormUploader(config);
    		var putExtra = new qiniu.form_up.PutExtra();
    		var key = name;
    		// 文件上传
    		formUploader.putFile(uploadToken, key, files.cloudfile.path, putExtra, function(respErr, respBody, respInfo) {
    		  if (respErr) {
    		    throw respErr;
    		  }
    		  if (respInfo.statusCode == 200) {
    		    fs.unlinkSync(files.cloudfile.path)
                utils.json(res, {
                    code: 200,
                    data: "http://image.gacjc.com/" + name,
                    name: name,
                    success: true,
                    message: '上传成功！'
                });
    		  } else {
    		    utils.json(res, {
                    code: 200,
                    success: false,
                    message: '上传失败！'
                });
    		  }
    		});

        })
    }

}

module.exports = file;