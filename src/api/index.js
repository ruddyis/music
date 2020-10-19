// 这个JS文件就是专门用于管理请求各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayList = (data) => Network.get('/playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('/song/url', data)
export const getArtistsSong = (data) => Network.get('artists', data)
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=3&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=3&area=96&initial=${letter}`)
    ])
      .then(function (result) {
        // console.log(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '云音乐飙升榜', id: 19723756 },
        { name: '云音乐新歌榜', id: 3779629 },
        { name: '网易原创歌曲榜', id: 2884035 },
        { name: '云音乐热歌榜', id: 3778678 }
      ],
      recList: [
        { name: '新说唱热歌榜', id: 5213356842 },
        { name: '云音乐说唱榜', id: 991319590 },
        { name: '云音乐古典音乐榜', id: 71384707 },
        { name: '云音乐电音榜', id: 1978921795 },
        { name: '抖音排行榜', id: 2250011882 },
        { name: '新声榜', id: 2617766278 }
      ],
      globalList: [
        { name: '云音乐ACG音乐榜', id: 71385702 },
        { name: '云音乐韩语榜', id: 745956260 },
        { name: '云音乐国电榜', id: 10520166 },
        { name: '英国Q杂志中文版周榜', id: 2023401535 },
        { name: '电竞音乐榜', id: 2006508653 },
        { name: 'UK排行榜周榜', id: 180106 }
      ],
      otherList: [
        { name: '美国Billboard周榜', id: 60198 },
        { name: 'Beatport全球电子舞曲榜', id: 3812895 },
        { name: 'KTV唛榜', id: 21845217 },
        { name: 'iTunes榜', id: 11641012 },
        { name: '日本Oricon数字单曲周榜', id: 60131 },
        { name: 'Hit FM Top榜', id: 120001 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        data.list.forEach(function (obj) {
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopList = (data) => Network.get('/playlist/detail', data)
export const getSearchList = (data) => Network.get('/search?type=1', data)
export const getSearchHot = (data) => Network.get('search/hot')
