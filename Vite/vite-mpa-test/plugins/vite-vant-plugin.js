const viteVantPlugin = (options) => {
  return {
    name: 'vite-plugin-vant',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (/^vant\/es\/[a-zA-Z]+\/style$/.test(source)) {
        // console.log('source', source);
        const resolution = await this.resolve(`${source}/index`, importer, {
					skipSelf: true,
					...options
				})
        return resolution.id
      }
    }
  }
}
export default viteVantPlugin