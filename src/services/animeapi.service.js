import { functions, isNil } from "lodash"
import { isEmpty } from "ramda"

let client = (baseUrl) => (endpoint, paramConfig, customConfig = {}) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'GET',
      ...customConfig,
    }
    let url = isNil(paramConfig) ?
      baseUrl + endpoint :
      baseUrl + endpoint + "?" + new URLSearchParams(paramConfig).toString()
    fetch(url, config).then(async res => {
      res.ok ? (resolve(await res.json())) : (
        Promise.reject(console.log(new Error(await res.text())))
      )
    })
  })

}


let baseUrl = {
  jikan: 'https://api.jikan.moe/v4',
  animeChan: "https://animechan.vercel.app"
}

let animeProxy = (baseUrl) => {
  const animeApiHandler = {
    get(target, prop, receiver) {
      const result = Reflect.get(target, prop, receiver);
      return client(result)
    },
    set(target, prop, val, reciver) {
      Reflect.set(target, prop, val);
      return 'done'
    }
  }
  return new Proxy(baseUrl, animeApiHandler)
}


function animeApi() {
  this.proxyAnime = animeProxy(baseUrl)
}

animeApi.prototype.getSchedules = function(pg) {
  let get = this.proxyAnime.jikan
  return get("/schedules", pg)
}

animeApi.prototype.getTopAnime = function(pg) {
  let get = this.proxyAnime.jikan
  return get("/top/anime", pg)
}
animeApi.prototype.getQuotes = function() {
  let get = this.proxyAnime.animeChan
  return get("/api/random")
}

animeApi.prototype.getGenres = function() {
  let get = this.proxyAnime.jikan
  return get("/genres/anime")
}

animeApi.prototype.geetAnimeById = function(id) {
  let get = this.proxyAnime.jikan
  const url = "/anime/" + id
  return get(url)
}
animeApi.prototype.getAnimeSearch = function(config) {
  let get = this.proxyAnime.jikan
  return get("/anime", config)
}

export default new animeApi();
