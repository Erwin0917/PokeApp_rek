export type IPokemonInfo = {
	abilities: IAbility[];
	base_experience: number;
	forms: IForm[];
	game_indices: IGameIndices[];
	height: number;
	held_items: IHeldItems[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: IMoves;
	name: string;
	order: number;
	species: ISpecies;
	sprites: ISprites;
	stats: IStats[];
	types: ITypes[];
	weight: number;
};

export interface IAbility {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
}

export interface IForm {
	name: string;
	url: string;
}

export interface IGameIndices {
	game_index: number;
	version: {
		name: string;
		url: string;
	};
}

interface IHeldItems {
	item: {
		name: string;
		url: string;
	};
	version_details: IVersionDetal[];
}

interface IVersionDetal {
	rarity: number;
	version: {
		name: string;
		url: string;
	};
}
interface IMoves {
	move: {
		name: string;
		url: string;
	};
	version_group_details: IVersionGroupDetails[];
}

interface IVersionGroupDetails {
	level_learned_at: number;
	move_learn_method: {
		name: string;
		url: string;
	};
	version_group: {
		name: string;
		url: string;
	};
}

interface ISpecies {
	name: string;
	url: string;
}

export interface ISprites {
	back_default: string;
	back_female: string;
	back_shiny: string;
	back_shiny_female: string;
	front_default: string;
	front_female: string;
	front_shiny: string;
	front_shiny_female: string;
}

export interface IStats {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

export interface ITypes {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}
