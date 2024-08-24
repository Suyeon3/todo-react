import TodoList from './component/TodoList';
import { ArrProvider } from './context/ArrayContext';

function App() {
  return (
    <div className="App">
      <ArrProvider>
        <TodoList/>
      </ArrProvider>
    </div>
  );
}

export default App;
