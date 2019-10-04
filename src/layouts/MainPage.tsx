import React from "react";
import PokemonList from "../components/PokemonList";
import SearchInput from "../components/form/SearchInput";
import { connect } from "react-redux";
import { MainStore } from "../reducers/mainReducer";
import { IPokemons } from "../interfaces/IPokemons";
import styled from "styled-components";

interface Props {
	pokemons: IPokemons[];
}

const MainPage = (props: Props) => {
	return (
		<div>
			<StyledSearchInput suggestions={props.pokemons} />
			<PokemonList />
		</div>
	);
};

const mapStateToProps = (state: MainStore) => {
	const { pokemons } = state;
	return { pokemons };
};

export default connect(mapStateToProps)(MainPage);

const StyledSearchInput = styled(SearchInput)`
	&&& {
		position: relative;
		max-width: 600px;
		left: 50%;
		transform: translateX(-50%);
	}
`;
