import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_description }</td>
        <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_responsible }</td>
        <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_priority }</td>
        <td>
            <Link to={ "/edit/"+props.todo_id }>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Welcome to todo list</h3>
                <table className="table table-striped" style={{marginTop: "10"}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}