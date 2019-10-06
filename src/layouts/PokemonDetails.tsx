import React, { Component } from "react";
import pokeApi from "../api/pokeApiConfig";
import { RouteComponentProps } from "react-router-dom";
import {
	IPokemonInfo,
	IAbility,
	ITypes,
	IStats
} from "../interfaces/IPokemonInfo";
import { connect } from "react-redux";
import { MainStore } from "../reducers/mainReducer";
import PokemonActions from "../actions/PokemonActions";
import PokemonUtil from "../utils/PokemonUtil";
import { IPokemonDetails } from "../interfaces/IPokemonDetails";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Avatar, LinearProgress } from "@material-ui/core";

const StyledPokemonInfoWrapper = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	max-width: 800px;
	background-color: white;
	border-radius: 8px;
	margin: 0 auto;
	margin-top: 80px;
	padding: 25px;
`;

const StyledAvatar = styled(Avatar)`
	&&& {
		position: absolute;
		width: 120px;
		height: 120px;
		left: 20px;
		top: -60px;
		background: #ffde00;
		border: 4px solid white;
	}
`;

const StyledTitle = styled(Typography)`
	position: absolute;
	left: 150px;
	color: white;
	top: -60px;
	text-transform: capitalize;
	font-weight: 900;
`;

const StyledBasicInfo = styled.div`
	display: flex;
	padding-left: 130px;
	margin-bottom: 40px;
`;

const StyledSubTitle = styled(Typography)`
	&&& {
		font-weight: bold;
		margin-right: 20px;
	}
`;

const StyledInfoBox = styled.span`
	padding: 5px 7px;
	border-radius: 4px;
	color: white;
	background-color: ${({ color }) => color};
	text-transform: capitalize;
`;

const StyledStatItem = styled.div`
	width: 100%;
	padding: 15px 0;
	border-bottom: 1px solid #d1d1d1;
	text-transform: capitalize;

	b {
		font-weight: bold;
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

	public componentDidMount() {
		this.setCurrentPokemon();
	}

	private setCurrentPokemon = () => {
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
	private renderDetails = () => {
		const { name, avatarUrl, abilities, types } = this.state.currentPokemon;

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
				<StyledTitle variant="h2" component="h1">
					{name}
				</StyledTitle>
				<StyledBasicInfo>
					<StyledSubTitle>
						Type:{" "}
						<StyledInfoBox color="#CC0000">
							{typesName.join(", ")}
						</StyledInfoBox>
					</StyledSubTitle>
					<StyledSubTitle>
						Ability:{" "}
						<StyledInfoBox color="#B3A125">
							{abilitiesName.join(", ")}
						</StyledInfoBox>
					</StyledSubTitle>
				</StyledBasicInfo>
				{this.renderStats()}
			</StyledPokemonInfoWrapper>
		);
	};

	private renderStats = () => {
		const { stats, height, weight } = this.state.currentPokemon;

		return (
			<>
				<StyledStatItem>
					<Typography variant="body1">
						Height: <b>{(height / 10).toFixed(2)}m</b>
					</Typography>
				</StyledStatItem>
				<StyledStatItem>
					<Typography variant="body1">
						Weight: <b>{(weight / 10).toFixed(1)}kg</b>
					</Typography>
				</StyledStatItem>
				{stats.map((stat: IStats) => {
					return (
						<StyledStatItem key={stat.stat.name}>
							<Typography variant="body1">
								{stat.stat.name}: <b>{stat.base_stat}</b>
							</Typography>
							<LinearProgress variant="determinate" value={stat.base_stat} />
						</StyledStatItem>
					);
				})}
			</>
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
