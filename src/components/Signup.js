import { Form, Alert, Button } from 'react-bootstrap'
import React from 'react'

class SignupForm extends React.Component {

    form() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
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

                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        name="fname"
                        value={this.state.input.fname || ''}
                        onChange={this.handleChange}
                        isInvalid={!!this.state.errors['fname']}
                        type="text" placeholder="Enter your first name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        name="lname"
                        value={this.state.input.lname || ''}
                        onChange={this.handleChange}
                        isInvalid={!!this.state.errors['lname']}
                        type="text" placeholder="Enter your last name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        value={this.state.input.password || ''}
                        onChange={this.handleChange}
                        isInvalid={!!this.state.errors['password']}
                        type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        name="passwordRepeat"
                        value={this.state.input.passwordRepeat || ''}
                        onChange={this.handleChange}
                        isInvalid={!!this.state.errors['passwordRepeat']}
                        type="password" placeholder="Repeat Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

    success() {
        return (
            <Alert variant="success">
                Account was created. You can now <a href="/login">log in</a>.
            </Alert>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            showForm: true
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

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);

            let input = {};
            input.fname = "";
            input.lname = "";
            input.email = "";
            input.password = "";
            input.passwordRepeat = "";
            this.setState({
                input: input,
                showForm: false
            });
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input.fname) {
            isValid = false;
            errors["fname"] = true;
        }

        if (!input.lname) {
            isValid = false;
            errors["lname"] = true;
        }

        if (!input.email) {
            isValid = false;
            errors["email"] = true;
        }

        if (!input.password) {
            isValid = false;
            errors["password"] = true;
        }

        if (!input.passwordRepeat) {
            isValid = false;
            errors["passwordRepeat"] = true;
        }

        if (input.password !== input.passwordRepeat) {
            isValid = false;
            errors["passwordRepeat"] = true;
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

    render() {
        if (this.state.showForm)
            return this.form()
        else
            return this.success();
    }
}

export default SignupForm