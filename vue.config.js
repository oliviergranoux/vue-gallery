module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = "Vue Gallery";
      return args;
    })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mqueries.scss";
          @import "@/styles/_mixings.scss";
        `
      }
    }
  }

}