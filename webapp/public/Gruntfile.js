module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //压缩js
    uglify: {
      options: {
        //合并时允许输出头部信息y
        stripBanners: true,
        ie8: true,
        banner: '/*!<%= pkg.name %> - <%= pkg.version %> */\n'
      },
      //按原文件结构压缩js文件夹内所有JS文件
      // my_target: {
      // files: [{
      // 	expand: true,
      // 	cwd: 'src/js',
      // 	src: '**/*.js',
      // 	dest: 'dist/js'
      // }]
      // },
      //合并压缩a.js和b.js
      release: {
        files: {
          'dist/js/lib.js': [
            'src/js/plugin/jquery-1.12.4.min.js',
            'src/js/plugin/slick.min.js',
            'src/js/plugin/imagesloaded.pkgd.min.js',
            'src/js/plugin/masonry.pkgd.min.js',
            'src/js/plugin/commentImg.js',
            'src/js/plugin/jquery.imagezoom.min.js',
            'src/js/plugin/jquery.pagination.js',
            'src/js/plugin/jquery.overlayScrollbars.min.js',
            'src/js/plugin/Validform_v5.3.2_min.js',
            'src/js/plugin/Zebra_Datepicker/dist/zebra_datepicker.min.js',
            'src/js/utils.js',
            'src/js/common.js',
            'src/js/Convert_Pinyin.js',
            'src/js/imgFileupload.js',
            'src/js/plugin/state.js',
            'src/js/plugin/jqzoom.js',
            'src/js/plugin/jszip.min.js', //压缩成zip下载
            'src/js/plugin/FileSaver.min.js', //压缩成zip下载
            'src/js/plugin/batchPic/qiniu.js', //批量上传图片相关
            'src/js/cropper.min.js',
            'src/js/share.js' // 分享
          ],
          'dist/js/v.js': [
            'src/js/vue/vue.js',
            'src/js/vue/lodash.js',
            'src/js/vue/element2.4.5.js',
            'src/js/vue/babel.js',
          ]
        }
      }
    },

    //删除css文件夹下的js
    clean: {
      js: ['dist/css/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerInitTask('default', ['uglify', 'clean']);

};