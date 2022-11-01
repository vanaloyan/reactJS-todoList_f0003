import './TodoList.css'
import {useEffect, useState} from "react";
import TodoItem from "./TodoItem/TodoItem";
const { v4: uuidv4 } = require('uuid');

const TodoList = ({
  obj,
  deleteTodo,
  checkTodo,
  restoreTodo,
  length,
  isEditable,
  setTodo
}) => {
    const [isEmpty,setIsEmpty] = useState(false)

    useEffect(() => {
        if(!obj.length){
            setIsEmpty(true)
        }else{
            setIsEmpty(false)
        }
    },[obj.length])

    return(
        <div className="todoList">
            <div className="pageTitle"> Todo List</div>
                {!isEmpty ?(<div className="todoListLayout">
                    {
                        obj.map((item, index) => {
                            return(
                                <TodoItem
                                    todos={obj}
                                    index={uuidv4()}
                                    key = {index}
                                    item={item}
                                    deleteTodo = {deleteTodo}
                                    checkTodo = {checkTodo}
                                    restoreTodo={restoreTodo}
                                    isEditable={isEditable}
                                    setTodo={setTodo}
                                    />
                                )
                            }
                        )
                    }
                </div>)
                :
                    (<h2>list is empty</h2>)
                }
        </div>
    )
}
export default TodoList