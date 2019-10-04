import React, { Component } from "react";
import MainPage from "./layouts/MainPage";
import { Provider } from "react-redux";
import mainStore from "./store/mainStore";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./const/Routes";
import PokemonDetails from "./layouts/PokemonDetails";
import { GlobalStyle } from "./GlobalStyles";

class App extends Component {
	render() {
		return (
			<Provider store={mainStore}>
				<GlobalStyle />
				<div className="App">
					<BrowserRouter>
						<Switch>
							<Route exact path={Routes.HOME} component={MainPage} />
							<Route path={Routes.POKEMON} component={PokemonDetails} />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}

export default App;
