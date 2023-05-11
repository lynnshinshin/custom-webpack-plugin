/*
 * @Author: ZhouKaiBai
 * @Date: 2023-05-10 14:35:59
 * @LastEditTime: 2023-05-11 11:03:11
 * @LastEditors: ZhouKaiBai
 * @Description: 自定义webpack插件
 */

class SplitChunksPlugin {
  options = {
    chunks: 'all',
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    cacheGroups: {
      vendors: {
        name: 'kb_vendors_node_modules',
        test: /[\\/]node_modules[\\/]/,
        priority: -5
      },
      common: {
        name: 'kb_common',
        chunks: 'all',
        minChunks: 2,
        priority: -10
      }
    }
  }

  /**
   * 构造函数
   * @param {Object} options 选项参数
   */
  constructor(options = {}) {
    // 接收参数
    Object.assign(this.options, options);
  }

  /**
   * 应用插件
   * @param {Object} compiler Webpack compiler 对象
   */
  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('SplitChunks', () => {
      if (process.env.NODE_ENV === 'production' && compiler.options.optimization) {
        compiler.options.optimization.splitChunks = this.options;
      }
    });
  }
}

class ExcludeFilePlugin {
  options = {
    exclude: [/\.md$/, /\.txt$/] // 默认排除 markdown、txt 文件
  }

  /**
   * 构造函数
   * @param {Object} options 选项参数
   */
  constructor(options = {}) {
    Object.assign(this.options, options);
  }

  /**
   * 应用插件
   * @param {Object} compiler Webpack compiler 对象
   */
  apply(compiler) {
    compiler.hooks.emit.tap('ExcludeFilePlugin', (compilation) => {
      if (process.env.NODE_ENV !== 'production') return;
      const { exclude } = this.options;
      for (const filename in compilation.assets) {
        if (exclude.some(regex => regex.test(filename))) {
          delete compilation.assets[filename];
        }
      }
    });
  }
}

const CustomWebpackPlugin = {
  SplitChunksPlugin,
  ExcludeFilePlugin
};

module.exports = CustomWebpackPlugin;