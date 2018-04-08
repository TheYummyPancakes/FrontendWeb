import React, {Component} from 'react';
import {Row, Input, Col, Button} from 'react-materialize'
import './App.css';

var Api = require('./utils/Api');

class App extends Component {

    state = {
        selectedFile: null
    }

    constructor(props) {
        super(props);
        this.state = {
            addressFrom: "",
            addressTo: "",
            telNumber1: "",
            telNumber2: "",
            dateFrom: "",
            dateTo: "",
            toTime1: "",
            toTime2: "",
            fromTime1: "",
            fromTime2: "",
            comment1: "",
            comment2: "",
            deliverItem: "",
            selectedFile: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler= this.fileSelectedHandler.bind(this);
        this.fileUploadHandler= this.fileUploadHandler.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(event) {
        /*console.log(this.state);*/
        Api.sendData(this.state)
            .then(function (response) {
                console.log(response);
            })
        event.preventDefault();
    }

    fileSelectedHandler(event){
        this.setState ({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler() {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        console.log(fd);
        Api.sendPicture(fd)
            .then(function(response){
                console.log(response);
            })
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12}>
                        <ul id="tabs-swipe" className={"tabs"}>
                            <li className={"tab col s3"}><a className={"active"} href="#swipe-1">Step 1.Where
                                from</a></li>
                            <li className={"tab col s3"}><a href="#swipe-2">Step 2.Where to</a></li>
                            <li className={"tab col s3"}><a href="#swipe-3">Step 3.What we deliver</a></li>
                            <li className={"tab col s3"}><a href="#swipe-4">Step 4.How it looks</a></li>
                        </ul>
                        <form onSubmit={this.handleSubmit}>
                            <div id="swipe-1">
                                <Input s={12} label="Where to get" name="addressFrom"
                                       value={this.state.addressFrom} onChange={this.handleChange}/>
                                <Input s={12} type='tel' label="Sender's phone number" name="telNumber1"
                                       value={this.state.telNumber1} onChange={this.handleChange}/>
                                <Input label="Pick date" type='date' name="dateFrom" value={this.state.dateFrom}
                                       onChange={this.handleChange} s={4}/>
                                <Input label="From:" type='time' name="fromTime1" value={this.state.fromTime1}
                                       onChange={this.handleChange} s={4}/>
                                <Input label="To:" type='time' name="toTime1" value={this.state.toTime1}
                                       onChange={this.handleChange} s={4}/>
                                <Input type="textarea" label="Comment" name="comment1" value={this.state.comment1}
                                       onChange={this.handleChange}
                                       placeholder="Apartment number, office, wishes and etc."
                                       s={12}/>
                            </div>
                            <div id="swipe-2">
                                <Input s={12} label="Where to deliver" name="addressTo"
                                       value={this.state.addressTo} onChange={this.handleChange}/>
                                <Input s={12} validate type='tel' label="Recipient's phone number" name="telNumber2"
                                       value={this.state.telNumber2} onChange={this.handleChange}/>
                                <Input label="Pick date" type='date' name="dateTo" value={this.state.dateTo}
                                       onChange={this.handleChange} s={4}/>
                                <Input label="From:" type='time' name="fromTime2" value={this.state.fromTime2}
                                       onChange={this.handleChange} s={4}/>
                                <Input label="To:" type='time' name="toTime2" value={this.state.toTime2}
                                       onChange={this.handleChange} s={4}/>
                                <Input type="textarea" label="Comment" name="comment2" value={this.state.comment2}
                                       onChange={this.handleChange} placeholder="Apartment number, office and etc."
                                       s={12}/>
                            </div>
                            <div id="swipe-3">
                                <Input label="What we deliver" name="deliverItem"
                                       value={this.state.deliverItem} onChange={this.handleChange} s={12}/>
                                <Button type="submit">Confirm</Button>
                                <input
                                    style={{display: 'none'}}
                                    type="file"
                                    onChange={this.fileSelectedHandler}
                                    ref={fileInput => this.fileInput = fileInput}/>
                                    <Button className='buttonPickFile' onClick={() => this.fileInput.click()}>Pick File</Button>
                                    <Button className='buttonUpload' onClick={this.fileUploadHandler}>Upload</Button>
                            </div>
                            <div id="swipe-4">
                            </div>
                        </form>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default App;
