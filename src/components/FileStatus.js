import React from 'react'
import axios from 'axios'

class FileStatus extends React.Component {

    constructor(props) {
        super(props);

        let { fileId, status, token } = props;
        this.token = token;

        let input = [];
        input[fileId] = status;

        this.state = {
            input,
            fileStatus: this.props.status,
            fileId: this.props.fileId,
            editMode: false
        }
    }

    startEditing() {
        this.setState({
            editMode: true
        });
    }

    handleChange = (event, fileId) => {
        let input = this.state.input;
        input[fileId] = event.target.value;

        this.setState({
            input
        });
    }

    handleOnKeyDown = (event, fileId) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    }

    handleOnBlur = (event, fileId) => {
        if (event.target.value.trim() === "") {
            console.log("nimic");
        } else {
            axios.post(`http://localhost:5001/api/v1/files/${fileId}/details`,
                {
                    status: event.target.value
                },
                {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {
                    let input = [];
                    input[fileId] = event.target.value;
                    this.setState({
                        input,
                        editMode: false
                    });
                });
        }
    }

    haddleOnFocus = (event, fileId) => {
        event.target.select();
    }

    render() {
        const { input, fileId, editMode } = this.state;

        if (editMode)
            return (
                <input
                    type="text"
                    autoFocus
                    value={input[fileId]}
                    name={fileId}
                    onBlur={(e) => this.handleOnBlur(e, fileId)}
                    onChange={(e) => this.handleChange(e, fileId)}
                    onKeyDown={(e) => this.handleOnKeyDown(e, fileId)}
                    onFocus={(e) => this.haddleOnFocus(e, fileId)}
                />
            );

        return (
            <div onClick={this.startEditing.bind(this, fileId)}>{input[fileId]}</div>
        );
    }

}

export default FileStatus;