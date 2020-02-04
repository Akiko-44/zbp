const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')

// css sprite自适应计算
const customFormat = data => {
  const filename = data.spritesheet.image.match(/\w+_sprite.png$/g) || [
    'ico_sprite.png'
  ]
  const icoClass = filename[0].split('_')[0]
  var shared = `[class*="${icoClass}-"] { background: url(I) no-repeat; background-size: Wpx Hpx;  display:inline-block;vertical-align:middle;}`
    .replace('I', data.sprites[0].image)
    .replace('W', Math.ceil(data.spritesheet.width / 2))
    .replace('H', Math.ceil(data.spritesheet.height / 2))

  var perSprite = data.sprites
    .map(function (sprite) {
      return (
        `.${icoClass}-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }`
        .replace('N', sprite.name)
        // 加1像素解决显示不正常问题
        .replace('W', Math.ceil(sprite.width / 2) + 1)
        .replace('H', Math.ceil(sprite.height / 2) + 1)
        .replace('X', Math.ceil(sprite.offset_x / 2))
        .replace('Y', Math.ceil(sprite.offset_y / 2))
      )
    })
    .join('\n')

  return shared + '\n' + perSprite
}

const makeSprite = ({
    iconsPath,
    imgTargetPath,
    cssPath,
    cssImageRef
  }) =>
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, iconsPath),
      glob: '*.png'
    },
    target: {
      image: path.resolve(__dirname, imgTargetPath),
      css: [
        [path.resolve(__dirname, cssPath), {
          format: 'custom_format'
        }]
      ]
    },
    apiOptions: {
      cssImageRef
    },
    spritesmithOptions: {
      padding: 15
    },
    customTemplates: {
      custom_format: customFormat
    }
  })

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '中宝平',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  css: ['~/assets/css/app.css'],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#03A9F4'
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath: '//app.gacjc.com/mobileApp/',
    // publicPath: './mobileApp/',
    /* npm run generate */
    /*
     ** Run ESLint on save
     */
    /*
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {}
        })
      }
    },
    */
    plugins: [
      makeSprite({
        iconsPath: './static/icons',
        imgTargetPath: './assets/images/sprite.png',
        cssPath: './assets/css/common/sprite.css',
        cssImageRef: '~/assets/images/sprite.png'
      }),
      makeSprite({
        iconsPath: './static/icons/index',
        imgTargetPath: './assets/images/icoindex_sprite.png',
        cssPath: './assets/css/index/sprite.css',
        cssImageRef: '~/assets/images/icoindex_sprite.png'
      })
    ],
    bebel: {
      plugins: [
        'transform-vue-jsx',
        'transform-runtime',
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
          }
        ]
      ]
    },
    postcss: [
      require('postcss-url')(),
      require('postcss-prepend-imports')({
        path: path.resolve(__dirname, './assets/css'),
        files: ['vars.css']
      }),
      require('postcss-import')(),
      require('postcss-cssnext')({
        autoprefixer: {
          browsers: ['last 2 versions', 'Android >= 4.1']
        }
      }),
      require('postcss-px2rem')({
        remUnit: 37.5,
        remPrecision: 4,
        minPixelValue: 2
      })
    ],
    vendor: ['axios', '~/plugins/global']
  },
  modules: ['@nuxtjs/proxy'],
  proxy: {
    '/app': {
      // target: 'http://192.168.8.236:83'
      target: 'http://192.168.8.177:83'
      // target: 'http://app.gacjc.com'
    },
    '/api': {
      // target: 'http://192.168.8.236:83'
      target: 'http://192.168.8.177:83'
      // target: 'http://219.134.137.178:83'
      // target: 'http://192.168.8.133:9001'
      // target: 'http://app.gacjc.com'
    },
    '/admin': {
      // target: 'http://192.168.8.236:83'
      target: 'http://192.168.8.177:83'
      // target: 'http://app.gacjc.com'
    },
    '/pc': {
      target: 'http://app.gacjc.com'
    },
    '/oauth2.0': {
      target: 'https://graph.qq.com',
    },
    '/oauth2': {
      target: 'https://api.weibo.com',
    },
    '/2': {
      target: 'https://api.weibo.com',
    },
    '/qq': {
      target: 'https://graph.qq.com',
      pathRewrite: {
        '^/qq': '/user'
      }
    }
  },
  plugins: [{
      src: '~/plugins/global'
    },
    {
      src: '~/plugins/service',
      ssr: false
    },
    {
      src: '~/plugins/loading',
      ssr: false
    },
    {
      src: '~/plugins/native',
      ssr: false
    }
  ],
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  },
  ignore: ['pages/**/modules/*.vue'],
  render: {
    resourceHints: false
  }
}
