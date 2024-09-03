import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTodos();
    }, []);
    console.log(todos);
    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8000/todos');
        setTodos(response.data);
    };

    const handleInputChange = (e) => {
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value
        });
    };
    console.log(newTodo)
    const handleCreateTodo = async () => {
        await axios.post('http://localhost:8000/todos', newTodo);
        fetchTodos();
        setNewTodo({ title: '', description: '' });
    };

    const handleUpdateTodo = async (id, updatedFields) => {
        await axios.put(`http://localhost:8000/todos/${id}`, updatedFields);
        fetchTodos();
    };

    const handleDeleteTodo = async (id) => {
        await axios.delete(`http://localhost:8000/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={newTodo.title}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newTodo.description}
                onChange={handleInputChange}
                required
            />
            <button onClick={handleCreateTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p>{todo.description}</p>
                        <button onClick={() => handleUpdateTodo(todo.id, { ...todo, completed: !todo.completed })}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
