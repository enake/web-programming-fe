import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { Component } from "react";

// Layout
import Layout from "./layout/Layout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import FilesPage from "./pages/Files";

class App extends Component {
	constructor() {
		super();

		this.state = {
			userObject: {
				user: {},
				updateUser: this.updateUser,
				logout: this.logout
			}
		};

		let userInfo = localStorage.getItem('userInfo');

		if (userInfo) {
			this.state.userObject.user = JSON.parse(userInfo);
		}

	}

	updateUser = (user) => {
		this.setState({ 
			userObject: { user: user }, 
			updateUser: this.updateUser,
			logout: this.logout
		 });
	}

	logout = () => {
		console.log("call to logout");
		localStorage.removeItem('userInfo');
		this.setState({
			userObject: { user: {}},
			updateUser: this.updateUser,
			logout: this.logout
		});
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
				<Layout>
					<Container>
						<Routes>
							<Route path="/" element={<Home />} exact />
							<Route exact path="/about" element={<About />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/files" element={<FilesPage />} />
							<Route element={<NotFound />} />
						</Routes>
					</Container>
				</Layout>
			</UserContext.Provider>
		);
	}
}

export default App;