import { Form, Button, FormText, Alert } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		const { context } = this.props;
		const { userObject } = context;
		this.updateuser = userObject.updateUser;

		const { location } = this.props;
		this.location = location;

		console.log(context);

		this.state = {
			input: {},
			errors: {},
			showForm: true,
			showError: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let input = this.state.input;
		input[event.target.name] = event.target.value;

		this.setState({
			input
		});
	}

	async handleSubmit(event) {
		event.preventDefault();

		if (this.validate()) {
			//console.log(this.state);

			let _showError = false;

			const response = await axios.post(`http://localhost:5001/api/v1/login`,
				{
					email: this.state.input.email,
					password: this.state.input.password
				});

			if (response.status !== 200) {
				_showError = "Server error!";
			} else {
				if (response.data.status === "error") {
					_showError = response.data.message;
				}

				if (response.data.status === "ok") {
					// login action
					let _token = response.data.data.token;
					let _user = response.data.data.email;
					let userInfo = {
						token: _token,
						user: _user,
						time: Date.now()
					}
					localStorage.setItem('userInfo', JSON.stringify(userInfo));
					if (this.updateuser)
						this.updateuser(userInfo);
				}
			}

			this.setState({
				showForm: false,
				showError: _showError
			}, () =>
				console.log(this.state));
		}
	}

	validate() {
		let input = this.state.input;
		let errors = {};
		let isValid = true;

		if (!input.email) {
			isValid = false;
			errors["email"] = true;
		}

		if (!input.password) {
			isValid = false;
			errors["password"] = true;
		}

		if (typeof input.email !== "undefined") {

			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(input["email"])) {
				isValid = false;
				errors["email"] = true;
			}
		}

		this.setState({
			errors: errors
		});

		return isValid;
	}

	form() {
		return (
			<Form onSubmit={this.handleSubmit}>
				{this.state.showError &&
					<FormText>
						<Alert variant="danger">
							{this.state.showError}
						</Alert>
					</FormText>
				}
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="email"
						value={this.state.input.email || ''}
						onChange={this.handleChange}
						isInvalid={!!this.state.errors['email']}
						type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						value={this.state.input.password || ''}
						onChange={this.handleChange}
						isInvalid={!!this.state.errors['password']}
						type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		)
	}

	render() {
		if (!this.state.showForm) {
			return <Navigate to="/files" />
		}

		return this.form()
	}
}

export default LoginForm;
