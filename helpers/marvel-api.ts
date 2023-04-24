import axios, { AxiosResponse } from 'axios'
import md5 from 'crypto-js/md5'
import { useAppStore } from '~/store/app'

const callApi = (method: string, endpoint: string, data?: any, loading?: string): Promise<AxiosResponse> => {
  const config = useRuntimeConfig()
  axios.defaults.baseURL = config.public.MARVEL_API_BASE
  loading === 'disableLoading' ? useAppStore().setLoading(false) : useAppStore().setLoading(true)

  const generateHash = (ts: number, privateKey: string, publicKey: string): string => {
    const hash = md5(`${ts}${privateKey}${publicKey}`)
    return hash.toString()
  }

  return axios({
    method,
    url: axios.defaults.baseURL + endpoint,
    params: {
      ...data.params,
      apikey: config.public.MARVEL_PUBLIC_KEY,
      ts: Date.now(),
      hash: generateHash(Date.now(), config.public.MARVEL_PRIVATE_KEY, config.public.MARVEL_PUBLIC_KEY)
    }
  }).then((response) => {
    return response.data
  })
    .catch((error) => {
      useAppStore().setLoading(false)
      useAppStore().setToast({
        show: true,
        message: error.response.data.message,
        icon: 'line-md:close-circle',
        template: 'error'
      })
    })
}

export const getCharacters = (params?: any) => {
  return callApi('get', 'characters', { params })
}

export const getCharacter = (id: any, params?: any) => {
  return callApi('get', `characters/${id}`, { params })
}

export const getCharacterComics = (id: any, params?: any) => {
  return callApi('get', `characters/${id}/comics`, { params })
}

export const getCharacterEvents = (id: any, params?: any) => {
  return callApi('get', `characters/${id}/events`, { params })
}

export const getCharacterSeries = (id: any, params?: any) => {
  return callApi('get', `characters/${id}/series`, { params })
}

export const getCharacterStories = (id: any, params?: any) => {
  return callApi('get', `characters/${id}/stories`, { params })
}

export const getSeries = (params?: any) => {
  return callApi('get', 'series', { params })
}

export const getComics = (params?: any) => {
  return callApi('get', 'comics', { params })
}
