import styles from '../style/todolist.module.css';
import { useEffect, useState, useContext } from 'react';
import TodoListItem from './TodoListItem';
import { ArrContext } from '../context/ArrayContext';


export default function TodoList() {
    const [input, setInput] = useState('');
    const { arr, setArr, save } = useContext(ArrContext);

    const todos = 'TODOS';
    
    useEffect(() => {
        load();
    }, []);

    useEffect(() => {   // arr이 바뀌면 localStorage 저장
        save(arr);
    }, [arr])

    function load() {
        const loading = localStorage.getItem(todos);

        if (loading) {
            const json = JSON.parse(loading);
            setArr(json);
        }
    }

    function put(text) {
        const liId = arr.length + 1;
        const todo = {
            id: liId,
            content: text,
            completed: false,
        };

        setArr((prevArr) => {
            const updatedArr = [...prevArr, todo];
            return updatedArr;
        });
    }

    function saveInput(e) {
        setInput(e.target.value);
    }

    function submit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            put(input);
            setInput('');
        }
    }

    return (
        <form>
            <input
                className={styles.input}
                type='text'
                placeholder='Enter your todo'
                value={input}
                onChange={saveInput}
                onKeyDown={(e) => submit(e)}
            ></input>
            <ul
                className={styles.todos}
            >
                {arr.map((todo) => (
                    <TodoListItem
                        todo={todo}
                        key={todo.id}
                    />
                ))}
            </ul>
        </form>
    )
}