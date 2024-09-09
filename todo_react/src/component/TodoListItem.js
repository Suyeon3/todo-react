import styles from '../style/todoItem.module.css';
import { useState } from 'react';

export default function TodoListItem({ todo, onDelete, onComplete, onEdit }) {
    const [editIsOn, setEditIsOn] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(todo.content);

    const handleCheck = (e) => {
        const completed = e.target.checked;
        onComplete({ ...todo, completed });
    }

    const handleDelete = () => onDelete(todo);

    function saveCurrentTodo(e) {
        setCurrentTodo(e.target.value);
    }

    function editToggle() {
        setEditIsOn((prev) => !prev);
    }

    function handleEdit(e) {
        if (e.key === 'Enter') {
            onEdit({...todo, content: currentTodo})
            editToggle();
        }
    }

    return (
        <li className={styles.todo}>
            <input
                className={styles.checkbox}
                type='checkBox'
                checked={todo.completed}
                onClick={handleCheck}
            />
            <span className={todo.completed ? `${styles.checkedTodo}` : `${styles.uncheckedTodo}`}>{currentTodo}</span>
            {editIsOn &&
                <input
                    className={styles.editField}
                    value={currentTodo}
                    onChange={(e) => saveCurrentTodo(e)}
                    onKeyDown={(e) => handleEdit(e)}
                />
            }
            <button onClick={editToggle}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </li>
    )
}