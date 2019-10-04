import { IPokemonInfo, ITypes, IAbility } from "../interfaces/IPokemonInfo";
import { MainStore } from "./../reducers/mainReducer";
import mainStore from "../store/mainStore";
import { IPokemonDetails } from "../interfaces/IPokemonDetails";

class PokemonUtil {
	public static getAvatarUrl(pokemon: IPokemonInfo): string {
		return pokemon.sprites.front_default;
	}

	public static getAbilities(pokemon: IPokemonInfo): IAbility[] {
		return pokemon.abilities;
	}

	public static getName(pokemon: IPokemonInfo): string {
		return pokemon.name;
	}

	public static getHeight(pokemon: IPokemonInfo): number {
		return pokemon.height;
	}

	public static getWeight(pokemon: IPokemonInfo): number {
		return pokemon.weight;
	}

	public static getTypes(pokemon: IPokemonInfo): ITypes[] {
		return pokemon.types;
	}

	public static getByName(name: string) {
		const store = mainStore.getState() as MainStore;
		return store.pokemonsDetails.find(
			(pokemon: IPokemonDetails) => pokemon.name === name
		);
	}
}

export default PokemonUtil;
