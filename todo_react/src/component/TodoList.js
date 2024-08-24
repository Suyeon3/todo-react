import styles from '../style/todolist.module.css';
import { useEffect, useState } from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList() {
    const [input, setInput] = useState('');
    const [arr, setArr] = useState([]);

    const todos = 'TODOS';

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        console.log(arr);
    }, [arr]);

    function load() {
        const loading = localStorage.getItem(todos);

        if (loading) {
            const json = JSON.parse(loading);
            setArr(json);
        }
    }

    function save(array) {
        localStorage.setItem(todos, JSON.stringify(array));
    }

    function put(text) {
        //li 생성 작업
        const liId = arr.length + 1;
        const todo = {
            id: liId,
            content: text,
            completed: false,
        };

        setArr((prevArr) => {
            const updatedArr = [...prevArr, todo];
            save(updatedArr); // 상태가 업데이트 된 후 저장
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
                id='todos'
            >
                {arr.map((todo) => (
                    <TodoListItem
                        todo={todo.content}
                        key={todo.id}
                    />
                ))}
            </ul>
        </form>
    )
}