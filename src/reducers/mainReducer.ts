import { AbilityActionName } from "./../const/AbilityActionName";
import { TypeActionName } from "./../const/TypeActionName";
import { IFetchDefElement } from "../interfaces/IFetchDefElement";
import { PokemonActionName } from "../const/PokemonActionName";
import { IPokemonDetails } from "../interfaces/IPokemonDetails";

export type MainStore = {
	pokemons: IFetchDefElement[];
	abilities: IFetchDefElement[];
	types: IFetchDefElement[];
	pokemonsDetails: IPokemonDetails[];
};

const initialState: MainStore = {
	pokemons: [],
	abilities: [],
	types: [],
	pokemonsDetails: []
};

const rootReducer = (state = initialState as any, action: any) => {
	switch (action.type) {
		case PokemonActionName.ADD_POKEMONS:
			if (state.pokemons.length === action.payload.length) return state;

			return {
				...state,
				pokemons: [...action.payload]
			};
		case TypeActionName.ADD_TYPES:
			if (state.types.length === action.payload.length) return state;

			return {
				...state,
				types: [...action.payload]
			};
		case AbilityActionName.ADD_ABILITIES:
			if (state.abilities.length === action.payload.length) return state;

			return {
				...state,
				abilities: [...action.payload]
			};
		case PokemonActionName.ADD_POKEMON:
			return {
				...state,
				pokemonsDetails: [...state.pokemonsDetails, action.payload]
			};
		default:
			return state;
	}
};

export default rootReducer;
