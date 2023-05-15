import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTask();
  }, [])

  //Get Task
  const getTask = async () => {
    await fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setTasks(data);
    })
  }

  //Add Task
  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task }
    console.log(newTask);
    await fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then(response => {
      return response.json();
    }).then(data => {
      getTask();
    })
  }

  //Delete Task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      getTask();
    })
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
        (task.id === id ? { ...task, reminder: !task.reminder } : task)
      )
    )
  }

  return (
    
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
        <Routes>
          <Route path='/about' element={<About />} />
        </Routes>
        <footer>
            <p>CLICK BELOW TO KNOW MORE</p>
            <Link to='/about'>About</Link>
        </footer>
      </div>
  );
}

export default App;
