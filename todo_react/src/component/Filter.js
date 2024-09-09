import styles from '../style/filter.module.css';

export default function Filter({ onFilter, filter }) {
    const status = ['All', 'Active', 'Completed']

    const handleFilter = (e) => onFilter(e.target.value);

    return (
        <header className={styles.header}>
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