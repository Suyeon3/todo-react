import styles from '../style/todolist.module.css';
import { useEffect, useState, useContext } from 'react';
import TodoListItem from './TodoListItem';
import AddTodo from './AddTodo';
import Filter from './Filter';
import { ArrContext } from '../context/ArrayContext';


export default function TodoList() {
    const [todoFilter, setTodoFilter] = useState('All');
    const { arr, setArr, save } = useContext(ArrContext);
    const todos = 'TODOS';

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {   // arr이 바뀌면 localStorage 저장
        save(arr);
        console.log(arr);
    }, [arr])

    function load() {
        const loading = localStorage.getItem(todos);

        if (loading) {
            const json = JSON.parse(loading);
            setArr(json);
        }
    }

    const put = (todo) => setArr((prevArr) => [...prevArr, todo]);

    const handleDelete = (deleted) =>
        setArr((prevArr) => [...prevArr.filter((t) => t.id !== deleted.id)]);

    const handleComplete = (completed) =>
        setArr((prevArr) => [...prevArr.map((t) => t.id === completed.id ? completed : t)])

    const handleEdit = (edited) => {
        setArr((prevArr) => [...prevArr.map((t) => t.id === edited.id ? edited : t)])
    }

    const filterTodo = (status) => setTodoFilter(status);


    return (
        <section className={styles.container}>
            <Filter onFilter={filterTodo} filter={todoFilter}/>
            <AddTodo onAdd={put} />
            <ul className={styles.list}>
                {arr.filter(todo =>
                    (todoFilter === 'All') ||
                    (todoFilter === 'Active' && !todo.completed) ||
                    (todoFilter === 'Completed' && todo.completed)
                )
                    .map(todo => (
                        <TodoListItem
                            todo={todo}
                            key={todo.id}
                            onDelete={handleDelete}
                            onComplete={handleComplete}
                            onEdit={handleEdit}
                        />
                    ))
                }
            </ul>
        </section>
    )
}