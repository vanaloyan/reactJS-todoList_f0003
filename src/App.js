import './App.css';
import {routes} from "./utils /routes";
import {initialValues} from "./constants/costants";
import Menu from "./Menu/Menu";
import {Switch,Route,Redirect} from "react-router-dom";
import TodoList from "./Navigation/TodoList/TodoList";
import {useState} from "react";
import InputTodoBox from "./InputTodoBox/InputTodoBox";

const App = () => {
    const [todos, setTodos] = useState(initialValues)
    const [completed, setCompleted]  = useState([])
    const [trash, setTrash] = useState([])
    const addNewTodo = newTodoObj => {
        if(newTodoObj.text.trim(' ')){
            setTodos(prev=>[...prev,newTodoObj])
        }
    }

    const deleteTodo = (deleteItem, location) => {
        let newData = []
        switch (location) {
            case routes.home:
                newData = [...todos]
                setTrash(prev => [...prev, deleteItem])
                newData = todos.filter(item => item.id !== deleteItem.id)
                setTodos(newData)
                break

            case routes.trashList:
                 newData = [...trash]
                 newData = trash.filter(item => item.id !== deleteItem.id)
                 setTrash(newData)
                 break

            case routes.completed:
                newData = [...completed]
                setTrash(prev => [...prev, deleteItem])
                newData = completed.filter(item => item.id !== deleteItem.id)
                setCompleted(newData)
                break

            default :
                break
        }
    }

    const restoreTodo = restoreItem => {
        if(restoreItem.isCompleted){
            setCompleted(prev=>[...prev, restoreItem])
        }else {
            setTodos(prev => [...prev, restoreItem])
        }
        let newTrashData = [...trash]
        newTrashData = trash.filter(item => item.id !== restoreItem.id)
        setTrash(newTrashData)
    }

    const checkTodo =  checkedItem => {
        if(checkedItem.isCompleted){
            let newTodos = [...todos]
            setCompleted(prev => [...prev, checkedItem])
            newTodos = todos.filter(item=>item.id !== checkedItem.id)
            setTodos(newTodos)
        }
        else {
            let newCompletedData = [...completed]
            setTodos(prev => [...prev, checkedItem])
            newCompletedData = completed.filter(item => item.id !== checkedItem.id)
            setCompleted(newCompletedData)
        }
    }

    return (
        <div className="app">
            <Menu />
            <Switch>
                <Route
                    exact path={routes.home}
                    render = {() => (
                        <TodoList
                            obj = {todos}
                            length={todos.length}
                            deleteTodo = {deleteTodo}
                            checkTodo={checkTodo}
                            isEditable
                            setTodo={setTodos}
                        />
                    )}
                />
                <Route
                    exact path={routes.trashList}
                    render={() => (
                        <TodoList
                            obj={trash}
                            deleteTodo = {deleteTodo}
                            restoreTodo={restoreTodo}
                        />
                    )}
                />
                <Route
                    exact path={routes.completed}
                    render={() => (
                        <TodoList
                            obj={completed}
                            deleteTodo = {deleteTodo}
                            checkTodo={checkTodo}
                        />
                    )}
                />
                <Redirect  to={routes.home} />
            </Switch>
            <InputTodoBox
                addNewTodo={addNewTodo}
                length={todos.length}
            />
        </div>
    );
}
export default App;
