import './TodoItem.css'
import { useLocation } from 'react-router-dom';
import {useEffect, useState} from "react";

const TodoItem = ({
  item,
  deleteTodo,
  checkTodo,
  restoreTodo,
  isEditable,
  setTodo,
  index,
  todos
}) => {

    const {id,isCompleted,text} = item
    const location = useLocation()
    const [isInTrash,setIsInTrash] = useState(false)
    const [inputValue,setInputValue] = useState('')
    const [isEdit,setIsEdit] = useState(false)

    useEffect(() => {
        if(location.pathname.includes('trash-list')){
            setIsInTrash(true)
        }else{
            setIsInTrash(false)
        }
    },[location.pathname])

    const handleSubmit = e => {
        e.preventDefault();
        setInputValue(text)
        setIsEdit(prev=>!prev)
    }

    const handelEditTodo = event => {
        if(event.key === "Enter"){
            if(setTodo){
                const newItems = todos.map((elem,idx)=>{
                if(index === idx && inputValue.trim(' ')){
                    return {...elem, text: inputValue}
                }
                return elem
                })
                setTodo(newItems)
            }
        }
    }

    const handelChecked = event => {
        checkTodo(
            {
                id:id,
                text:text,
                isCompleted : event.target.checked
            }
        )
    }

    return(
        <div className="todoItem">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={handelChecked}
            />
            <p>{text}</p>
            {
                isInTrash && <button className="restoreBtn" onClick={()=>{restoreTodo({id,text,isCompleted})}}>restore</button>
            }

            {
                isEditable
                &&
                    <form onSubmit = {handleSubmit}>
                        <button type='submit' >edit</button>
                            <input
                                className={isEdit ? "openEditInput" : "closeEditInput"}
                                value={inputValue}
                                onChange={({target}) => setInputValue(target.value)}
                                onKeyDown={handelEditTodo}
                                type="text"
                            />
                    </form>
            }
            <button className="deleteBtn"  onClick={()=>{deleteTodo({id,text,isCompleted},location.pathname)}}>delete</button>
        </div>
    )
}
export default TodoItem