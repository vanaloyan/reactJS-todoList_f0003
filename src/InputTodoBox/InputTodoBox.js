import './InputTodoBox.css'

const InputTodoBox = ({
addNewTodo,
length
}) => {
    const keyDownHandler = (event) =>{
       if(event.key === 'Enter'){
           addNewTodo(
               {
                   id:length,
                   text:event.target.value,
                   isCompleted: false
               }
           )
           event.target.value = ''
       }
   }

   return(
       <div className="inputTodoBox">
           <input type="text"
             onKeyDown={keyDownHandler}
           />
       </div>
   )
}
export default InputTodoBox