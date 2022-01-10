import { Table, Alert, Spinner } from 'react-bootstrap'
import { Navigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios'
import { saveAs } from "file-saver";

class FilesTable extends React.Component {

	constructor(props) {
		super();

		const { context } = props;
		const { userObject } = context;


		this.token = null;
		this.logout = null;
		if (userObject.user.token) {
			this.token = userObject.user.token;
			this.logout = userObject.logout;
		}

		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};

	}

	async componentDidMount() {

		axios.get(`http://localhost:5001/api/v1/files`, {
			headers: {
				'Authorization': this.token
			}
		}).then(res => {
			if (res.data.status !== "ok")
				this.setState({
					isLoaded: true,
					error: "Server Message: " + res.data.message
				});

			this.setState({
				error: null,
				isLoaded: true,
				items: res.data.data
			});
		})
			.catch(err => {
				if (err.response.status === 401)
					if (this.logout)
						this.logout();
				this.setState({
					isLoaded: true,
					error: "token"
				});

				if (err.response.status !== 200)
					this.setState({
						isLoaded: true,
						error: "Server Error - Data not received"
					});
			});

	}

	getFile(event, fileId, fileName) {
		event.preventDefault();
		let url = `http://localhost:5001/api/v1/files/` + fileId;
		fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': this.token
			},
		})
			.then(function (response) {
				return response.blob();
			}
			)
			.then(function (blob) {
				saveAs(blob, fileName);
			})
			.catch(error => {
				//whatever
			})
	}

	render() {
		const { error, isLoaded, items } = this.state;

		if (!isLoaded) {
			return (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			);
		}

		if (error) {

			if (error === "token") {
				return <Navigate to="/login" />
			}

			return (
				<Alert variant="danger">
					{this.error}
				</Alert>
			);
		}

		return (
			<Table responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>File name</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.file_id}>
							<td>{item.file_id}</td>
							<td>
								<a onClick={(e) => this.getFile(e, item.file_id, item.file_name)} href="!#">{item.file_name}</a>
							</td>
							<td>{item.status}</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	}

}

export default FilesTable;