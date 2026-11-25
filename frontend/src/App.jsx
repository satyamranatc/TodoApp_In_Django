import React, { useState,useEffect } from 'react'
import axios from 'axios'
export default function App() 
{

  let [allTasks,setAllTasks] = useState([]);

  async function getAll()
  {
    let res = await axios.get("http://localhost:8000/todo/getAll");
    setAllTasks(res.data.result);
  }

  useEffect(()=>{
    getAll();
  },[])


  async function handleSubmit(e) 
  {
    e.preventDefault();

    let data = {
      taskName:e.target.taskName.value,
      taskDesc:e.target.taskDesc.value
    }

    let res = await axios.post('http://localhost:8000/todo/addTodo',data);
    console.log(res.data);
    setAllTasks([...allTasks,res.data.result]);

  
  }

  return (
    <div>
      <div id="heading">
        <h2>Todo App:</h2>
      </div>

    <div id="TodoForm">
      <form onSubmit={handleSubmit} >
        <div>
          <p>Type The Task Name:</p>
          <input type="text" placeholder='Task Name...' name='taskName' />
        </div>
        <div>
          <p>Type The Task Desc:</p>
          <input type="text" placeholder='Task Desc...' name='taskDesc' />
        </div>
        <div>
          <button>Add This</button>
        </div>
      </form>
    </div>


    <div id="outputTable">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Task Name</th>
            <th>Task Desc</th>
          </tr>
        </thead>

        <tbody>
          {
            allTasks.map((task,index)=>(
              <tr key={index} >
                <td>{index}</td>
                <td>{task.taskName}</td>
                <td>{task.taskDesc}</td>
              </tr>
            ))  
          }
        </tbody>
      </table>
    </div>

    </div>
  )
}
