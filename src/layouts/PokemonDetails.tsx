import React, { Component } from "react";
import pokeApi from "../api/pokeApiConfig";
import { RouteComponentProps } from "react-router-dom";
import { IPokemonInfo, IAbility, ITypes } from "../interfaces/IPokemonInfo";
import { connect } from "react-redux";
import { MainStore } from "../reducers/mainReducer";
import PokemonActions from "../actions/PokemonActions";
import PokemonUtil from "../utils/PokemonUtil";
import { IPokemonDetails } from "../interfaces/IPokemonDetails";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import {
	Avatar,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from "@material-ui/core";

const StyledPokemonInfoWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const StyledAvatar = styled(Avatar)`
	&&& {
		width: 150px;
		height: 150px;
	}
`;

const StyledTable = styled(Table)`
	&&& {
		width: 100%;
	}
`;

interface State {
	currentPokemon: IPokemonDetails;
}

type Props = RouteComponentProps<{ name: string }> & {
	addPokemonDetails: (pokemon: IPokemonInfo) => void;
};

class PokemonDetails extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			currentPokemon: null
		};
	}

	componentDidMount() {
		this.setCurrentPokemon();
	}

	setCurrentPokemon = () => {
		const pokemonName = this.props.match.params.name;
		let currentPokemon = PokemonUtil.getByName(pokemonName);
		if (!currentPokemon) {
			pokeApi.get(`pokemon/${pokemonName}`).then(res => {
				this.props.addPokemonDetails(res.data);
				this.setState({
					currentPokemon: PokemonUtil.getByName(res.data.name)
				});
			});
		} else {
			this.setState({
				currentPokemon
			});
		}
	};
	renderDetails = () => {
		const {
			name,
			avatarUrl,
			abilities,
			height,
			weight,
			types
		} = this.state.currentPokemon;

		let abilitiesName: string[] = [];
		abilities.forEach((ability: IAbility) => {
			abilitiesName.push(ability.ability.name);
		});
		let typesName: string[] = [];
		types.forEach((type: ITypes) => {
			typesName.push(type.type.name);
		});

		return (
			<StyledPokemonInfoWrapper>
				<StyledAvatar src={avatarUrl} alt={`Avatar of ${name}`}></StyledAvatar>
				<Typography variant="h2" component="h1">
					{name}
				</Typography>
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Abilities</TableCell>
							<TableCell align="left">Type</TableCell>
							<TableCell align="left">Height&nbsp;(m)</TableCell>
							<TableCell align="left">Weight&nbsp;(kg)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="left">{name}</TableCell>
							<TableCell align="left">{abilitiesName.join(", ")}</TableCell>
							<TableCell align="left">{typesName.join(", ")}</TableCell>
							<TableCell align="left">{(height / 10).toFixed(2)}</TableCell>
							<TableCell align="left">{(weight / 10).toFixed(1)}</TableCell>
						</TableRow>
					</TableBody>
				</StyledTable>
			</StyledPokemonInfoWrapper>
		);
	};

	render() {
		return <>{this.state.currentPokemon && this.renderDetails()}</>;
	}
}

const mapStateToProps = (state: MainStore) => {
	const { pokemonsDetails } = state;
	return { pokemonsDetails };
};

const mapDispatchToProps = (dispatch: any) => ({
	addPokemonDetails: (pokemon: IPokemonInfo) =>
		dispatch(PokemonActions.addPokemonWithDetails(pokemon))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PokemonDetails);
