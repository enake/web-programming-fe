import { FormText, Alert, Button } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import eventBus from "../EventBus"

class FileUpload extends React.Component {
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
            fileUpload: false
        }

        this.submitFile = this.submitFile.bind(this)
    }

    submitFile() {
        try {
            if (!this.state.file) {
                throw new Error('Select a file first!');
            }
            this.setState({ fileUpload: true })
            let headers = {
                'Authorization': this.token
            }

            const formData = new FormData();
            formData.append('file', this.state.file[0]);

            axios.post(`http://localhost:5001/api/v1/files`,
                formData,
                {
                    headers: headers
                }
            )
                .then(resp => {
                    eventBus.dispatch("fileUpload", { message: resp });
                })

        } catch (error) {
            console.log(error)
        }
    };

    render() {
        if (!this.state.fileUpload) {
            return (
                <form onSubmit={this.submitFile}>
                    <label>Upload file</label>
                    <input type="file" onChange={event => this.setState({ file: event.target.files })} />
                    <Button type="submit">Send</Button>
                </form>
            );
        }
        else {
            return (
                <FormText>
                    <Alert variant="success">
                        Upload Completed
                        <Button onClick={event => this.setState({ fileUpload: false })}>
                            Upload another
                        </Button>
                    </Alert>
                </FormText>
            )
        }
    }
}

export default FileUpload;