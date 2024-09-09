import styles from '../style/filter.module.css';
import { useDarkMode } from '../context/DarkModeContext';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function Filter({ onFilter, filter }) {
    const { darkIsOn, toggleDarkMode } = useDarkMode();

    const status = ['All', 'Active', 'Completed']

    const handleFilter = (e) => onFilter(e.target.value);

    return (
        <header className={styles.header}>
            <button onClick={toggleDarkMode} className={styles.toggle}>
                {!darkIsOn && <HiMoon />}
                {darkIsOn && <HiSun />}
            </button>
            <ul className={styles.filters}>
                {status.map((state) =>
                    <li>
                        <button
                            className={`${styles.filter} ${filter === state && styles.selected}`}
                            onClick={handleFilter}
                            value={state}
                        >
                            {state}
                        </button>
                    </li>
                )}
            </ul>
        </header>
    )
}