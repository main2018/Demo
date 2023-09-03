const viteVantPlugin = (options) => {
  return {
    name: 'vite-plugin-vant',
    async resolveId(source, importer, options) {
      console.log(source, 22222);
      if (source == 'vant/es/button/style') {
        const resolution = await this.resolve('vant/es/button/style/index', importer, {
					skipSelf: true,
					...options
				})
        return resolution.id
      }
    }
  }
}
export default viteVantPlugin