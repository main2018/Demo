/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-04-01 23:01:24
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-04-05 00:26:01
 * @FilePath: /code-demo/Game/pixi-template/src/components/game/loader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Assets } from 'pixi.js';
import manifest from './manifest.json';
import {cloneDeep} from 'lodash-es';
// import fontHintedAtmaBold from '../../assets/font/hinted-Atma-Bold.woff2?url';
// import slingoWinAtlas1 from '../../img/spine/slingo_win/slingo_win.atlas?url';
// console.log(fontHintedAtmaBold, slingoWinAtlas1, 111111);


export default class Loader {
  constructor() {
    this.assets = {}
    this.currCount = 0 // 当前加载数量
    this.totalCount = 0 // 总加载数量
    this.resourceProgress = {}
  }
  setProgress(name, p, resource) {
    console.log(name, p, resource);
    this.resourceProgress[name] = {
      ...this.resourceProgress[name],
      progress: p,
      resource,
    }
    const curr = Object.values(this.resourceProgress).reduce((acc, item) => {
      acc.progress = acc.progress + item.progress
      acc.total = acc.total + item.total
      return acc
    }, {progress: 0, total: 0})
    console.log(curr, 11111);
    return Math.round(curr.progress/curr.total*100)
    
  }
  async init(progress = () => {}) {
    const progressFunc = (name) => (p, resource) => progress(this.setProgress(name, p, resource))
    const pArr = [
      {
        name: 'main',
        p: this.loadMain(progressFunc('main')),
        total: 1,
      },
      {
        name: 'fonts',
        // p: this.loadBundle('font', [
        //   // {alias: 'hinted-Atma-Bold', src: fontHintedAtmaBold},
        //   { alias: 'Crosterian', src: 'https://pixijs.com/assets/webfont-loader/Crosterian.woff2' },
        // ], progressFunc('fonts')),
        p: this.loadFonts([
          { name: 'hinted-Atma-Bold', url: new URL('../../assets/font/hinted-Atma-Bold.woff2', import.meta.url).href },
          { name: 'Crosterian', url: 'https://pixijs.com/assets/webfont-loader/Crosterian.woff2' },
        ], progressFunc('fonts')),
        total: 1,
      },
      {
        name: 'spines',
        p: this.loadBundle('spines', {
          slingoWinData: new URL('../../img/spine/slingo_win/slingo_win.json', import.meta.url).href,
          // slingoWinAtlas: new URL('../../img/spine/slingo_win/slingo_win.atlas', import.meta.url).href,
          slingoWinAtlas: this.loadAtlas('slingo_win/slingo_win.atlas'),
        }, progressFunc('spines')),
        total: 1,
      },
    ]
    for (const p of pArr) {
      this.resourceProgress[p.name] = {
        progress: 0,
        total: p.total,
        resource: p.resource,
      }
    }
    const [main, fonts, spines] = await Promise.all(pArr.map(item => item.p))
    this.assets = {
      main,
      fonts,
      spines,
    }
    console.log('assets', this.assets);
    
    return this.assets
  }
  async loadMain(cb) {
    const manifestClone = cloneDeep(manifest);
    manifestClone.bundles.forEach(item => {
      item.assets?.forEach(asset => {
        asset.src = new URL(`../../img/${asset.src}`, import.meta.url).href
      })
    })
    
    const bundle = await this.loadManifest(manifestClone, cb)
    return bundle;
  }
  async loadFonts(fonts, cb) {
    for (let i = 0; i < fonts.length; i++) {
      const font = new FontFace(fonts[i].name, `url(${fonts[i].url})`);
      await font.load();
      document.fonts.add(font);
      cb?.((i+1)/fonts.length)
    }
  }
  async loadAtlas(atlas) {
    // const atlasModules = import.meta.glob('../../img/spine/**/*.atlas', { query: 'url', import: 'default' });
    // console.log('atlasModules', atlasModules);
    // for (const path in atlasModules) {
    //   atlasModules[path]().then((mod) => {
    //     console.log(path, mod, 33333333)
    //   })
    // }
    // if (!Array.isArray(atlas)) atlas = [atlas]
    // await Promise.all(atlas.map(item => {
    //   const [dir, name] = item.split('/');
    //   return import(`../../img/spine/${dir}/${name}.atlas?url`)
    // }))
    const [dir, name] = atlas.split('.')[0].split('/')
    return (await import(`../../img/spine/${dir}/${name}.atlas?url`)).default
    // return import.meta.glob('../../img/spine/${dir}/slingo_win.atlas', { eager: true, query: 'url', import: 'default' })
  }
  async loaderAssets(assets, cb) {
    if (Array.isArray(assets)) {
      for (const asset of assets) {
        Assets.add(asset)
      }
      assets = assets.map(({alias}) => alias)
    }
    const total = assets.length;
    return await Assets.load(assets, (p, resource) => {
      cb?.(p, resource)
    })
  }
  async loadManifest(manifest, cb) {
    // ✅ 正确：只初始化一次（通常在应用启动时）
    // let bundle = Assets.resolver.manifest?.bundles?.find(b => b.name === name);
    // console.log(bundle, 4444448869);
  
    // if (bundle) return false; // Bundle 未定义
    Assets.init({manifest});
    // Assets.loadBundle(['load-screen', 'game-screen']);
    const total = manifest.bundles.reduce((acc, item) => acc + (item.assets?.length || 0), 0);
    const bundle = await Assets.loadBundle(manifest.bundles.map(item => item.name), (p, resource) => {
      cb?.(p, resource);
    });
    return bundle;
  }
  async loadBundle(name, assets, cb) {
    // console.log(Assets, 88888);
    // Assets.addBundle('animals', [
    //   { alias: 'bunny', src: 'bunny.png' },
    //   { alias: 'chicken', src: 'chicken.png' },
    //   { alias: 'thumper', src: 'thumper.png' },
    //  ]);
    //  // or
    //  Assets.addBundle('animals', {
    //      bunny: 'bunny.png',
    //      chicken: 'chicken.png',
    //      thumper: 'thumper.png',
    //  });

    for (const asset of Object.values(assets)) {
      // if (asset instanceof URL) {
      //   asset.href = asset.href.replace(/\.json$/, '.atlas')
      // }
      if (asset instanceof Promise) {
        await asset;
      }
    }
    let ps = {}
    if (Array.isArray(assets)) {
      assets.map((item, i) => {
        if (item.src instanceof Promise) {
          ps[i] = item.src
        }
      })
      const pr = await Promise.all(Object.values(ps))
      for (const key in ps) {
        assets[key].src = pr[key]
      }
    } else {
      for (const key in assets) {
        if (assets[key] instanceof Promise) {
          ps[key] = assets[key]
        }
      }
      const pr = await Promise.all(Object.values(ps))
      // console.log(pr, 22222);
      for (const i in Object.entries(ps)) {
        const [key, value] = Object.entries(ps)[i];
        assets[key] = pr[i]
      }
    }
    // console.log(assets, 11111);
    
    
    Assets.addBundle(name, assets);
    const total = Object.keys(assets).length;
    const bundle = await Assets.loadBundle(name, (p, resource) => {
      cb?.(p, resource);
    });
    return bundle;
  }
}