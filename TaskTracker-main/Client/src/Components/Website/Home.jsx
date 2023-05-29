import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Home() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || false);

  const [tasks, setTasks] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    getTasks();
  }, []);

  const [task, setTask] = useState({
    UserID: user.id,
    title: "",
    description: "",
    priority: "",
    date: "",
    done: false,
  })

  const [editTaskId, setEditTaskId] = useState(false);

  function handleTaskDescription(e) {
    setTask({ ...task, description: e.target.value });
  }

  function handleTaskTitle(e) {
    setTask({ ...task, title: e.target.value });
  }

  function handleTaskPriority(e) {
    setTask({ ...task, priority: e.target.value });
  }

  function handleTaskDate(e) {
    setTask({ ...task, date: e.target.value });
  }

  function handleSubmit() {

    if (!user) {
      return;
    }

    if (editTaskId) {
      axios.post('http://localhost:5000/updateTask', { ...task, id: editTaskId })
        .then((res) => {
          setEditTaskId(false);
          setTask({
            UserID: user.id,
            title: "",
            description: "",
            priority: "",
            date: "",
            done: false,
          });
          getTasks();
        }).catch((err) => {
          console.log(err);
        })
      return;
    }

    axios.post('http://localhost:5000/createTask', task).then((res) => {
      getTasks();
    }).catch((err) => {
      console.log(err);
    })
    setTask({
      UserID: user.id,
      title: "",
      description: "",
      priority: "",
      date: "",
      done: false,
    });

  }

  function getTasks() {
    axios.get("http://localhost:5000/getTasks")
      .then((res) => {
        const result = res.data.filter((task) => {
          return task.UserID === user.id;
        });
        setTasks(result);
      })
  }

  function TaskDone(taskDone) {

    axios.post('http://localhost:5000/updateTask', { ...taskDone, done: !taskDone.done })
      .then((res) => {
        console.log(res)
        getTasks();
      }).catch((err) => {
        console.log(err);
      })

  }

  function handleEdit(taskEdit) {

    setTask({
      UserID: user.id,
      title: taskEdit.title,
      description: taskEdit.description,
      priority: taskEdit.priority,
      date: taskEdit.date,
      done: taskEdit.done,
    });

    setEditTaskId(taskEdit.id);
  }

  function handleRemove(event) {
    const { id } = event.target;
    console.log(id)
    axios.post("http://localhost:5000/deleteTask", { id: id })
      .then((res) => {
        getTasks();
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-4/5 ">
          <div className="mb-4">
            <h1 className="text-grey-darkest font-bold text-4xl text-center text-blue-600">Todo List</h1>

            <div className="grid grid-cols-1 grid-rows-3 gap-8 md:grid-cols-3 md:grid-rows-1 md:gap-12 mt-4">
              <input onChange={(e) => handleTaskTitle(e)} value={task.title}
                className="shadow appearance-none rounded w-full py-2 px-3 mr-4 text-grey-darker border-2 focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="Title"
              />

              <select value={task.priority}
                className="select select-primary shadow  border-2 rounded w-full py-2 px-3 mr-4 text-grey-darker focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="priority"
                onChange={(e) => handleTaskPriority(e)}
              >
                <option value="Task Priority">Task Priority</option>
                <option value="red">High</option>
                <option value="yellow">Medium</option>
                <option value="green">Low</option>
              </select>


              <input onChange={(e) => handleTaskDate(e)} value={task.date}
                className="shadow appearance-none border-2 rounded w-full py-2 px-3 mr-4 text-grey-darker focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="date"
                type='date'
              />
            </div>
            <div className="grid grid-cols-1 grid-rows-1 gap-0">
              <input onChange={(e) => handleTaskDescription(e)} value={task.description}
                className="shadow appearance-none border-2 rounded w-full py-2 px-3 mr-4 text-grey-darker mt-4 focus:outline-none border-blue-300 focus:border-blue-500 dark:border-blue-500"
                placeholder="Add Todo"
              />
            </div>
            <div className="flex mt-4 justify-center">
              <button onClick={(e) => handleSubmit()} className="md:w-1/5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {editTaskId ? 'Confirm Edit' : 'Add'}
              </button>
            </div>
          </div>
          <div>

            {tasks?.map((Task) => {
              return (
                <div key={Task.id} className="flex flex-wrap py-6 md:p-6 justify-center text-lg font-serif">
                  <div className={`bg-gray-100 flex-grow text-black border-l-8 border-${Task.priority}-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12`}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-1 mt-4 justify-items-center text-center">
                      <div className=''>
                        <label className="label text-sm font-bold text-gray-700 ">Title</label>
                        <h1 className='text-lg font-serif italic font-semibold'>{Task.title}</h1>
                      </div>
                      <hr className={`w-full border-${Task.priority}-500 md:hidden`} />
                      <div>
                        <label className="label text-sm font-bold text-gray-700">End Data</label>
                        <h1 className='text-lg font-serif italic font-semibold'>{Task.date}</h1>
                      </div>
                      <hr className={`w-full border-${Task.priority}-500 md:hidden`} />
                      <div>
                        <label className="label text-sm font-bold text-gray-700">Status</label>
                        <div>
                          <span className={`bg-${Task.done ? 'green' : 'red'}-100 text-${Task.done ? 'green' : 'red'}-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-${Task.done ? 'green' : 'red'}-400 border border-${Task.done ? 'green' : 'red'}-400`}>{Task.done ? 'Done' : "Not Done"}</span>
                        </div>
                      </div>
                    </div>

                    <div className='py-4 text-center'>
                      <hr className={`w-full border-${Task.priority}-500 py-4`} />
                      <label className="label text-lg font-bold text-gray-700 ">ToDo</label>
                      <p className='text-lg font-serif italic font-semibold break-words'>{Task.description}</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-rows-1 md:grid-cols-3 justify-center'>
                      <button onClick={() => TaskDone(Task)} className={`text-${Task.done ? 'gray' : 'green'}-700 hover:text-white border border-${Task.done ? 'gray' : 'green'}-700 hover:bg-${Task.done ? 'gray' : 'green'}-800 focus:ring-4 focus:outline-none focus:ring-${Task.done ? 'gray' : 'green'}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-${Task.done ? 'gray' : 'green'}-500 dark:text-${Task.done ? 'gray' : 'green'}-500 dark:hover:text-white dark:hover:bg-${Task.done ? 'gray' : 'green'}-600 dark:focus:ring-${Task.done ? 'gray' : 'green'}-800 transition-hover duration-300`}>
                        {Task.done ? 'Not Done' : 'Done'}
                      </button>
                      <button onClick={() => handleEdit(Task)} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition-hover duration-300">
                        Edit
                      </button>
                      <button id={Task.id} onClick={handleRemove} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 transition-hover duration-300">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={` ${user ? 'hidden' : ''} flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert`}>
        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span className="sr-only">Info</span>
        <div>
          You must <span className="font-medium">log in</span> before adding to your list.
        </div>
      </div>
    </>
  )
}
