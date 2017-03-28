import React, { Component, PropTypes } from 'react';
import pureRender from "pure-render-decorator"

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            persons: []
        }
    }
    render() {
        const {name, age, persons} = this.state
        return (
            <div>
                <span>姓名:</span><input value={name} name="name" onChange={this._handleChange.bind(this)} style={{color:'#000'}}></input>
                <span>年龄:</span><input value={age} name="age" onChange={this._handleChange.bind(this)}  style={{color:'#000'}}></input>
                <input type="button" onClick={this._handleClick.bind(this)} value="确认"></input>
                {persons.map((person, index) => (
                    <Person key={index} name={person.name} age={person.age}></Person>
                ))}
            </div>
        )
    }
    _handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    _handleClick() {
        const {name, age} = this.state
        this.setState({
            name: "",
            age: "",
            persons: this.state.persons.concat([{ name: name, age: age }])
        })
    }
}
@pureRender
class Person extends Component {
    componentWillReceiveProps(newProps) {
        console.log(`我新的props的name是${newProps.name}，age是${newProps.age}。我以前的props的name是${this.props.name}，age是${this.props.age}是我要re-render了`);
    }
    render() {
        const {name, age} = this.props;
        console.log(1);
        return (
            <div>
                <span>姓名:</span>
                <span>{name}</span>
                <span> age:</span>
                <span>{age}</span>
            </div>
        )
    }
}
