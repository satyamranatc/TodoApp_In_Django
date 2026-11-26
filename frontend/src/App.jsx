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

  async function handleUpdate(id)
  {

    let data = {
      "taskName":prompt("Enter Task Name"),
      "taskDesc":prompt("Enter Task Desc")
    }

      let res = await axios.put(`http://localhost:8000/todo/updateTodo/${id}`,data);

      if (res.data.status = "Success")
      {
        alert("Data Updated")
        getAll()
      }
      else
      {
        alert("Something Went Wrong")
      }
  }

  async function handleDelete(id)
  {
    
      let res = await axios.delete(`http://localhost:8000/todo/deleteTodo/${id}`);

      if (res.data.status = "Success")
      {
        alert("Data Updated")
        getAll()
      }
      else
      {
        alert("Something Went Wrong")
      }
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
            <th>Task Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            allTasks.map((task,index)=>(
              <tr key={index} >
                <td>{index}</td>
                <td>{task.taskName}</td>
                <td>{task.taskDesc}</td>
                <th>
                  <button className='update-Btn' onClick={()=>handleUpdate(task.id)} >Update</button>
                  <button className='dlt-Btn' onClick={()=>handleDelete(task.id)}  >Delete</button>
                </th>
              </tr>
            ))  
          }
        </tbody>
      </table>
    </div>

    </div>
  )
}
