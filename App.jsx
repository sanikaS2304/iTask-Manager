import { useEffect, useState } from 'react'
import Navbar from './componentes/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todo)
    }
  }, [])

  const toggleFinish= (e)=>{
    setshowFinished(!showFinished)
  }
  

  const saveToLS = (params) => {
    localStorage.setItem("tools", JSON.stringify(todos))
  }
  
  const handleEdit= (e,id)=>{
    let t= todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!=id;
    });
    settodos(newtodos);
    saveToLS()
  }

  const handleDelete= (e, id)=>{
    let newtodos = todos.filter(item=>{
      return item.id!=id;
    });
    settodos(newtodos);
    saveToLS()
  }

  const handleAdd= ()=>{
    settodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    settodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange= (e)=>{
    settodo(e.target.value)
   
  }

  const handleCheckbox=(e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
  }
  

  return (
    <>
      < Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-purple-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manage Your Tasks At One Place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'> Add a todo</h2>
          < input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1'/>
          <button onClick= {handleAdd} disabled={todo.length<=3} className='bg-purple-800 hover:bg-violet-950 disabled:bg-purple-600 p-2 py-1 text-white text-sm 
          font-bold rounded-md '>Add</button>
        </div>
        <input onChange={toggleFinish} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item=>{

          
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-purple-800 hover:bg-violet-950 p-2 py-1 text-white text-sm 
              font-bold rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-purple-800 hover:bg-violet-950 p-2 py-1 text-white text-sm 
              font-bold rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
