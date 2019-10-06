import { IFetchDefElement } from "../interfaces/IFetchDefElement";
import { PokemonActionName } from "../const/PokemonActionName";
import { IPokemonInfo } from "../interfaces/IPokemonInfo";
import PokemonUtil from "../utils/PokemonUtil";

class PokemonActions {
	public static addPokemons(pokemons: IFetchDefElement[]) {
		return {
			type: PokemonActionName.ADD_POKEMONS,
			payload: pokemons
		};
	}

	public static addPokemonWithDetails(pokemon: IPokemonInfo) {
		const payload = {
			name: PokemonUtil.getName(pokemon),
			avatarUrl: PokemonUtil.getAvatarUrl(pokemon),
			abilities: PokemonUtil.getAbilities(pokemon),
			height: PokemonUtil.getHeight(pokemon),
			weight: PokemonUtil.getWeight(pokemon),
			types: PokemonUtil.getTypes(pokemon),
			stats: PokemonUtil.getStats(pokemon)
		};
		return {
			type: PokemonActionName.ADD_POKEMON,
			payload
		};
	}
}

export default PokemonActions;
