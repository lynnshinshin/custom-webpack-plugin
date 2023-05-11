# CustomWebpackPlugin 使用说明

CustomWebpackPlugin 是一个自定义的 Webpack 插件，提供了两个插件：SplitChunksPlugin 和 ExcludeFilePlugin。本文档将详细介绍这两个插件的使用方法和参数配置。

## 安装

使用 npm 安装 CustomWebpackPlugin：

```
npm install custom-webpack-plugin
```

## 使用示例

以下是一个完整的示例，展示了如何同时使用 SplitChunksPlugin 和 ExcludeFilePlugin：

```javascript
const { SplitChunksPlugin, ExcludeFilePlugin } = require('custom-webpack-plugin')

module.exports = {
  // 其他配置项...
  chainWebpack: (config) => {
    config.plugin('splitChunksPlugin').use(new SplitChunksPlugin())
    config.plugin('excludeFilePlugin').use(new ExcludeFilePlugin())
  }
}
```

## SplitChunksPlugin

SplitChunksPlugin 是一个用于优化代码分割的插件。它可以将代码分割为多个块，提高代码的加载效率。

- `options` (可选): 配置选项对象，用于定制代码分割的行为。

#### 配置选项

SplitChunksPlugin 的配置选项包括：

- `chunks` (默认值: 'all'): 指定哪些代码块需要进行分割。可选值有 'all', 'async', 'initial'。
- `maxAsyncRequests` (默认值: 5): 异步加载的最大并行请求数。
- `maxInitialRequests` (默认值: 3): 初始加载的最大并行请求数。
- `cacheGroups` (默认值: {}): 定义缓存组，用于控制代码块的分组行为。



## ExcludeFilePlugin

ExcludeFilePlugin 是一个用于排除指定文件的插件。它可以在构建过程中排除特定的文件，例如排除 markdown 和 txt 文件。


- `options` (可选): 配置选项对象，用于指定要排除的文件类型。

#### 配置选项

ExcludeFilePlugin 的配置选项包括：

- `exclude` (默认值: [/\.md$/, /\.txt$/]): 排除的文件类型的正则表达式数组。


     