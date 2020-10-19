// // const jsdom = require('jsdom')
// // const { JSDOM } = jsdom
// module.exports = {
//   /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
//   publicPath: './',
//   configureWebpack: {
//     module: {
//       rules: [
//         {
//           test: /\.(html)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'html-loader',
//             options: {
//               minimize: true
//             }
//           }
//         }
//       ]
//     }
//   },
//   devServer: {
//     disableHostCheck: false,
//     host: '192.168.191.1',
//     port: 8080,
//     https: false,
//     hotOnly: false,
//     proxy: null
//   },
//   // 以下代码是安装了预渲染的插件之后自动添加的
//   pluginOptions: {
//     prerenderSpa: {
//       registry: undefined,
//       renderRoutes: [
//         '/',
//         '/recommend',
//         '/singer',
//         '/rank',
//         '/search',
//         '/account',
//         '/detail'
//       ],
//       useRenderEvent: true,
//       headless: true,
//       onlyProduction: true,
//       postProcess: route => {
//         // 预渲染内容写入之前的额外操作
//         const reg = /<meta name="viewport".*user-scalable=no">/gi
//         const res = route.html.match(reg)
//         route.html = route.html.replace(res[1], '')
//         return route
//         /* // 1.根据字符串创建一个网页
//         const html = new JSDOM(route.html)
//         // 2.从创建好的网页中拿到document对象
//         const dom = html.window.document
//         // 3.找到对应的元素, 删除对应的元素
//         const loadingEle = dom.querySelector('.container')
//         dom.body.removeChild(loadingEle)
//
//         route.html = html.serialize() */
//       }
//     }
//   }
// }
const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
  publicPath: './',

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },
  devServer: {
    disableHostCheck: false,
    host: '192.168.191.1',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null
  },
  // 以下代码是安装了预渲染的插件之后自动添加的
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // 预渲染内容写入之前的额外操作
        // const reg = /<meta name="viewport".*user-scalable=no">/gi
        const reg = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">'
        const res = route.html.match(reg)
        route.html = route.html.replace(res, '')

        // 1.根据字符串创建一个网页
        const html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        const dom = html.window.document
        // 3.找到对应的元素, 删除对应的元素
        const loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)

        route.html = html.serialize()
        return route
      }
    }
  }
}
