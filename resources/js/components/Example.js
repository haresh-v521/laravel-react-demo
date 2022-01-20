import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../sass/style.scss';
import axios from 'axios';
import { data } from 'jquery';

class Example extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          name: '',
          lists: [],
          selected: [],
          bgColor: '',
          left: true,
          right: true
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmitButton = this.onSubmitButton.bind(this);
        this.selectList = this.selectList.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.getList = this.getList.bind(this);
    }
    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // create new item function
    async onSubmitButton(e) {
        e.preventDefault();
   
        await axios.post('api/postlist', {
            name: this.state.name,
            position: 'right'
        })
        .then(res => res)
        .then(response => { 
            const data = this.setState({
                lists: [...this.state.lists, response.data]
            })
        })
        .catch(function (error) {
            console.log(error);
        });
        this.setState({
            name: '',
        })
    }

    // load function when page run
    componentWillMount() {
        this.getList();
    }

    // get list of items function
    async getList() {
        let that = this;
        await axios.get('api/getlist')
        .then(res => res)
        .then(result => {
          this.setState({
            lists: result.data,
          })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // select item to switch data
    selectList(data) { 
        if (data.position === 'right') {
            this.state.left = false;
        } else {
            this.state.right = false;
        }
        this.setState({
            selected: [...this.state.selected, data],
        });
    }

    // call this function when change position
    async changePosition() {
        await axios.post('api/changePosition', {
            selected: this.state.selected
        })
        .then(res => res)
        .then(result => {
            this.getList();
        })
        .catch(function (error) {
            console.log(error);
        });
        this.setState({
            selected: [],
        })
        this.state.left = true;
        this.state.right = true;
    }
    render(){
        const right =this.state.lists.map((data) => { 
            if(data.position === 'right')
            {
                return (
                    <li className="list" style={{backgroundColor: this.state.bgColor}} onClick={() => this.selectList(data)} key={data.id} >{data.name}</li>
                )
            }
        });
        const left = this.state.lists.map((data) => { 
            if(data.position === 'left')
            {
                return (
                    <li className="list" style={{backgroundColor: this.state.bgColor}} onClick={() => this.selectList(data)} key={data.id} >{data.name}</li>
                )
            }
        });
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <div className="card">
                            <div className="card-header">Item Manamagement Page</div>

                            <div className="card-body">
                                <div className="row col-6">
                                    <div className="col-8">
                                        <input type="text" value={this.state.name} onChange={this.onChangeValue} name="name" id="name" className="form-control" ></input>
                                    </div>
                                    <div className="col-4">
                                        <input type="button" onClick={this.onSubmitButton} className="btn btn-primary" value="Add"></input>
                                    </div>
                                </div>
                                <div className="row col-12 mt-3">
                                    <div className="col-5 border height-100">
                                        <ul>
                                        {right}
                                        </ul>
                                    </div>
                                    <div className="col-2">
                                        <button type="button" disabled={this.state.left} onClick={this.changePosition} className="col-12 btn btn-primary mb-2">&gt;</button>
                                        <button type="button" disabled={this.state.right} onClick={this.changePosition} className="col-12 btn btn-primary">&lt;</button>
                                    </div>
                                    <div className="col-5 border height-100">
                                        <ul>
                                        {left}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById('user')) {
    ReactDOM.render(<Example />, document.getElementById('user'));
}
