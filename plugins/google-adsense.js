const Adsense = {
  install (Vue, options) {
    (adsbygoogle = window.adsbygoogle || []).push({})
    Vue.prototype.$adsense = window.adsbygoogle
  }
}

export default Adsense
