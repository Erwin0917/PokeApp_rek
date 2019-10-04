import React, { Component } from "react";
import { connect } from "react-redux";
import PokemonActions from "../actions/PokemonActions";
import pokeApi from "../api/pokeApiConfig";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import { MainStore } from "../reducers/mainReducer";
import { IPokemons } from "../interfaces/IPokemons";
import styled from "styled-components";

interface Props {
	addPokemons: (pokemons: IPokemons[]) => any;
	pokemons: IPokemons[];
}

class PokemonList extends Component<Props> {
	componentDidMount() {
		pokeApi
			.get("pokemon?offset=0&limit=1000")
			.then(res => this.props.addPokemons(res.data.results));
	}

	renderList = (list: any) => {
		return list.map((pokemon: any) => {
			return (
				<StyledListElement
					to={{
						pathname: `pokemon/details/${pokemon.name}`
					}}
					key={pokemon.name}
				>
					<ListItem button>
						<ListItemText primary={pokemon.name} />
					</ListItem>
				</StyledListElement>
			);
		});
	};

	render() {
		const { pokemons } = this.props;
		return (
			<StyledList subheader={<StyledHeader>All pokemon List</StyledHeader>}>
				{this.renderList(pokemons)}
			</StyledList>
		);
	}
}

const mapStateToProps = (state: MainStore) => {
	const { pokemons } = state;
	return { pokemons };
};

const mapDispatchToProps = (dispatch: any) => ({
	addPokemons: (pokemons: IPokemons[]) =>
		dispatch(PokemonActions.addPokemons(pokemons))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PokemonList);

const StyledList = styled(List)`
	left: 50%;
	transform: translateX(-50%);
	margin: 40px 0;
	max-width: 600px;
	border: 1px solid #3ae86b;
`;

const StyledHeader = styled(ListSubheader)`
	&&& {
		background-color: white;
	}
`;

const StyledListElement = styled(NavLink)`
	text-decoration: none;
	color: #04a369;
`;
