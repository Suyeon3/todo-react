import { createContext, useState, useEffect } from "react";

export const ArrContext = createContext();

export function ArrProvider({ children }) {
    const [arr, setArr] = useState(() => load()); // 콜백함수 써서 상태값 업데이트때마다 매번 함수 호출되지 않도록

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {   // arr이 바뀌면 localStorage 저장
        localStorage.setItem('TODOS', JSON.stringify(arr));
    }, [arr])

    function load() {
        const todos = localStorage.getItem('TODOS');

        return todos ? JSON.parse(todos) : []
    }

    return (
        <ArrContext.Provider value={{ arr, setArr }}>
            {children}
        </ArrContext.Provider>
    )
}