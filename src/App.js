
import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
// import {BsCheckLg} from 'react-icons/ai'
import {AiOutlineCheck} from 'react-icons/ai'
function App() {
  const [isCompleteScreen , setIsCompletedScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([])
  


  const handleAddTodo= ()=>{
    let newTodoItem={
      title: newTitle, 
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist' , JSON.stringify(updatedTodoArr))
  }

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
    };

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd+ '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }
    let updatedCompletedArr= [...completedTodos];
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos' , JSON.stringify(updatedCompletedArr))
  }


  const handleDeleteCompletedTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }


  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleted = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompleted){
      setCompletedTodos(savedCompleted)
    }
  },[])

  return  (
    <div className='App'>
      <h1>My todo</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-items'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
          </div>
          <div className='todo-input-items'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?"/>
          </div>
          <div className='todo-input-items'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn' >Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondarybtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompletedScreen(false)}>ToDo</button>
          <button className={`secondarybtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompletedScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen===false &&  allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete'/>
                  <AiOutlineCheck className='check-icon' onClick={()=>handleComplete(index)} title='Complete'/>
                </div>
    
              </div>
            )
          })}

          {isCompleteScreen===true &&  completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete'/>
                 
                </div>
    
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
