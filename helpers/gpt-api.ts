import axios, { AxiosResponse } from "axios";
import { useAppStore } from "~/store/app";

const callApi = (method: string, endpoint: string, data?: any, loading?: boolean): Promise<AxiosResponse> => {
  const config = useRuntimeConfig();
  axios.defaults.baseURL = config.public.PRIVATE_API;
  loading ? useAppStore().setLoading(false) : useAppStore().setLoading(true);
  return axios({
    method,
    url: axios.defaults.baseURL + endpoint,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "pt-BR",
      Accept: ["application/json"],
    }
  }).then((response) => {
    useAppStore().setLoading(false);
    return response.data;
  })
    .catch((error) => {
      useAppStore().setLoading(false);
      if (error.response.data.errors[0].detail === "Expired token") {
        useAppStore().$reset();
        navigateTo("/");
        useAppStore().setToast({
          show: true,
          title: "Token de acesso expirado!",
          description: "Por favor, faça login novamente.",
          type: "error"
        });
      }
      if (error.response.data.errors[0].detail === "Invalid access token") {
        useAppStore().$reset();
        navigateTo("/");
        useAppStore().setToast({
          show: true,
          title: "Invalid access token!",
          description: "Por favor, faça login novamente.",
          type: "error"
        });
      }
    });
};

export const getAllPokemons = () => {
  return callApi("get", "pokemon");
};

export const getPokemonByName = (name: string) => {
  return callApi("get", `pokemon/${name}`);
};
