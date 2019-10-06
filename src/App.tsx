import React, { Component } from "react";
import MainPage from "./layouts/MainPage";
import { Provider } from "react-redux";
import mainStore from "./store/mainStore";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./const/Routes";
import PokemonDetails from "./layouts/PokemonDetails";
import { GlobalStyle } from "./GlobalStyles";
import Logo from "./components/Logo";
import TypeDetails from "./layouts/TypeDetails";
import AbilityDetails from "./layouts/AbilityDetails";

class App extends Component {
	render() {
		return (
			<Provider store={mainStore}>
				<GlobalStyle />
				<div className="App">
					<Logo />
					<BrowserRouter>
						<Switch>
							<Route exact path={Routes.HOME} component={MainPage} />
							<Route path={Routes.POKEMON} component={PokemonDetails} />
							<Route path={Routes.TYPE} component={TypeDetails} />
							<Route path={Routes.ABILITY} component={AbilityDetails} />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}

export default App;
