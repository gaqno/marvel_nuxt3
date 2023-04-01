import axios from "axios";
import { ref } from "vue";

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  types: { type: { name: string } }[];
}

export function usePokemonSearch() {
  const loading = ref(false);
  const error = ref("");
  const pokemon = ref<Pokemon | null>(null);

  const searchPokemon = async (query: string) => {
    try {
      loading.value = true;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      const { data } = response;

      pokemon.value = {
        name: data.name,
        id: data.id,
        sprites: {
          back_default: data.sprites.back_default,
          back_female: data.sprites.back_female,
          back_shiny: data.sprites.back_shiny,
          front_default: data.sprites.front_default,
          front_female: data.sprites.front_female,
          front_shiny: data.sprites.front_shiny,
          front_shiny_female: data.sprites.front_shiny_female,
        },
        types: data.types,
      };
    } catch (e) {
      error.value = e as string;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    pokemon,
    searchPokemon,
  };
}
