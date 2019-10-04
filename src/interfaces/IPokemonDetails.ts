import { IAbility, ITypes } from "./IPokemonInfo";

export interface IPokemonDetails {
	abilities: IAbility[];
	avatarUrl: string;
	height: number;
	name: string;
	weight: number;
	types: ITypes[];
}
