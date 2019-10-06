import React from "react";
import SearchInput from "../components/form/SearchInput";
import { connect } from "react-redux";
import { MainStore } from "../reducers/mainReducer";
import { IFetchDefElement } from "../interfaces/IFetchDefElement";
import styled from "styled-components";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import pokeApi from "../api/pokeApiConfig";
import ElementsList from "../components/ElementsList";
import PokemonActions from "../actions/PokemonActions";
import TypeActions from "../actions/TypeActions";
import AbilityActions from "../actions/AbilityActions";
import PokemonUtil from "../utils/PokemonUtil";
import TypeUtil from "../utils/TypeUtil";
import AbilityUtil from "../utils/AbilityUtil";

const StyledMainPage = styled.div`
	background-color: white;
	border-radius: 8px;
	max-width: 900px;
	padding: 40px;
	margin: 0 auto;
`;

const StyledSearchInput = styled(SearchInput)`
	&&& {
		position: relative;
		max-width: 600px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

const StyledButtonWrapper = styled.div`
	max-width: 600px;
	margin: 0 auto;
	margin-bottom: 40px;
`;

const StyledButton = styled(Button)`
	&&& {
		background-color: #3b4cca;
		color: white;
	}
`;

enum ListTypes {
	POKEMONS = "pokemon",
	ABILITIES = "ability",
	TYPES = "type"
}

interface ICallbacksChecker {
	pokemonCallback: (...args: any) => void;
	abilitiesCallback: (...args: any) => void;
	typesCallback: (...args: any) => void;
}
interface Props {
	pokemons: IFetchDefElement[];
	addPokemons: (pokemons: IFetchDefElement[]) => void;
	addTypes: (types: IFetchDefElement[]) => void;
	addAbilities: (pokemons: IFetchDefElement[]) => void;
}

interface State {
	currentList: IFetchDefElement[];
	listType: ListTypes;
}

class MainPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			currentList: [],
			listType: ListTypes.POKEMONS
		};
	}

	public componentDidMount() {
		this.setCurrentList();
	}

	private setCurrentList = () => {
		let listFromStore: IFetchDefElement[] = [];
		this.listTypeChecker({
			pokemonCallback: () => (listFromStore = PokemonUtil.getAllPokemons()),
			typesCallback: () => (listFromStore = TypeUtil.getAllTypes()),
			abilitiesCallback: () => (listFromStore = AbilityUtil.getAllAbilities())
		});
		if (listFromStore.length > 0) {
			this.setState({
				...this.state,
				currentList: listFromStore
			});
		} else {
			try {
				this.fetchDataAndSetInStore();
			} catch (error) {
				console.log(error);
			}
		}
	};

	private fetchDataAndSetInStore = () => {
		this.setState({ ...this.state, currentList: [] });

		pokeApi.get(`${this.state.listType}?offset=0&limit=1000`).then(res => {
			const fetchedElements = res.data.results;
			this.setState({ currentList: fetchedElements });

			this.listTypeChecker({
				pokemonCallback: () => this.props.addPokemons(fetchedElements),
				typesCallback: () => this.props.addTypes(fetchedElements),
				abilitiesCallback: () => this.props.addAbilities(fetchedElements)
			});
		});
	};

	private listTypeChecker = (callback: ICallbacksChecker) => {
		switch (this.state.listType) {
			case ListTypes.POKEMONS:
				callback.pokemonCallback();
				break;
			case ListTypes.TYPES:
				callback.typesCallback();
				break;
			case ListTypes.ABILITIES:
				callback.abilitiesCallback();
				break;
			default:
				break;
		}
	};

	private onButtonClickHandler = (buttonType: ListTypes): void => {
		this.setState(
			{
				...this.state,
				listType: buttonType
			},
			this.setCurrentList
		);
	};

	/*
		View methods
	*/

	private renderCategoryButtons = () => {
		return (
			<StyledButtonWrapper>
				<Typography variant="h6" component="h2" style={{ color: "#0000008a" }}>
					Show all in category:
				</Typography>
				<ButtonGroup fullWidth aria-label="full width outlined button group">
					<StyledButton
						onClick={() => this.onButtonClickHandler(ListTypes.POKEMONS)}
					>
						Pokemons
					</StyledButton>
					<StyledButton
						onClick={() => this.onButtonClickHandler(ListTypes.TYPES)}
					>
						Types
					</StyledButton>
					<StyledButton
						onClick={() => this.onButtonClickHandler(ListTypes.ABILITIES)}
					>
						Abilities
					</StyledButton>
				</ButtonGroup>
			</StyledButtonWrapper>
		);
	};

	private renderSearchField = () => {
		return <StyledSearchInput suggestions={this.state.currentList} />;
	};

	private renderList = () => {
		const listTitles = [
			"All pokemons list",
			"All types list",
			"All abilities list"
		];
		let currentListTitle = listTitles[0];

		if (this.state.listType !== ListTypes.POKEMONS) {
			currentListTitle =
				this.state.listType === ListTypes.TYPES ? listTitles[1] : listTitles[2];
		}

		return (
			<ElementsList
				listTitle={currentListTitle}
				listElements={this.state.currentList}
				urlType={this.state.listType}
			/>
		);
	};

	public render() {
		return (
			<StyledMainPage>
				{this.renderCategoryButtons()}
				{this.renderSearchField()}
				{this.renderList()}
			</StyledMainPage>
		);
	}
}

const mapStateToProps = (state: MainStore) => {
	const { pokemons, abilities, types } = state;
	return { pokemons, abilities, types };
};

const mapDispatchToProps = (dispatch: any) => ({
	addPokemons: (pokemons: IFetchDefElement[]) =>
		dispatch(PokemonActions.addPokemons(pokemons)),
	addTypes: (types: IFetchDefElement[]) =>
		dispatch(TypeActions.addTypes(types)),
	addAbilities: (abilities: IFetchDefElement[]) =>
		dispatch(AbilityActions.addAbilities(abilities))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage);
