import { Col, Container, Row } from 'react-bootstrap'
import Header from '../components/Header'
import Meta from '../components/Meta'
import FilesTable from '../components/FilesTable'
import { UserContext } from "../context/UserContext"
import FileUpload from "../components/Upload"
import eventBus from "../EventBus"
import React from 'react'


class FilesPage extends React.Component {
	constructor(props) {
		super();

		const pageTitle = 'Files'
		const pageDescription = 'This is the list of files'

		this.state = {
			pageTitle: pageTitle,
			pageDescription: pageDescription,
			compKey: 0
		}
	}

	componentDidMount() {
		eventBus.on("fileUpload", (data) => {
			this.setState({
				compKey: this.state.compKey + 1
			});
		});
	}

	componentWillUnmount() {
		eventBus.remove("fileUpload");
	}

	render() {
		return (
			<div>
				<Meta title={this.state.pageTitle} />
				<Header head={this.state.pageTitle} description={this.state.pageDescription} />
				<Container>
					<Row>
						<Col>
							<UserContext.Consumer>
								{state => <FileUpload context={state} />}
							</UserContext.Consumer>
						</Col>
					</Row>
					<Row>
						<Col>
							<hr />
						</Col>
					</Row>
					<Row>
						<Col>
							<UserContext.Consumer>
								{state => <FilesTable key={this.state.compKey} context={state} />}
							</UserContext.Consumer>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default FilesPage;