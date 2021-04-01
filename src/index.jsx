import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Suggest from "./Suggest";

const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HashRouter>
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<Route path="/suggest">
						<Suggest />
					</Route>
					<Route path="*">{/*You can make a 404 page here*/}</Route>
				</Switch>
			</HashRouter>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);