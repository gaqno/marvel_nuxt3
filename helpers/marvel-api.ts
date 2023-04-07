import axios, { AxiosResponse } from "axios";
import { useAppStore } from "~/store/app";
import md5 from "crypto-js/md5";


const callApi = (method: string, endpoint: string, data?: any, loading?: string): Promise<AxiosResponse> => {
  const config = useRuntimeConfig();
  axios.defaults.baseURL = config.public.MARVEL_API_BASE;
  loading === "disableLoading" ? useAppStore().setLoading(false) : useAppStore().setLoading(true);

  const generateHash = (ts: number, privateKey: string, publicKey: string): string => {
    const hash = md5(`${ts}${privateKey}${publicKey}`);
    return hash.toString();
  };

  return axios({
    method,
    url: axios.defaults.baseURL + endpoint,
    params: {
      ...data.params,
      apikey: config.public.MARVEL_PUBLIC_KEY,
      ts: Date.now(),
      hash: generateHash(Date.now(), config.public.MARVEL_PRIVATE_KEY, config.public.MARVEL_PUBLIC_KEY),
    }
  }).then((response) => {
    useAppStore().setLoading(false);
    return response.data;
  })
    .catch((error) => {
      useAppStore().setLoading(false);
    });
};

export const getCharacters = (params?: any) => {
  return callApi("get", "characters", { params });
};

export const getCharacter = (id: number, params?: any) => {
  return callApi("get", `characters/${id}`, { params });
}

export const getCharacterComics = (id: number, params?: any) => {
  return callApi("get", `characters/${id}/comics`, { params });
}

export const getCharacterEvents = (id: number, params?: any) => {
  return callApi("get", `characters/${id}/events`, { params });
}

export const getCharacterSeries = (id: number, params?: any) => {
  return callApi("get", `characters/${id}/series`, { params });
}

export const getCharacterStories = (id: number, params?: any) => {
  return callApi("get", `characters/${id}/stories`, { params });
}

