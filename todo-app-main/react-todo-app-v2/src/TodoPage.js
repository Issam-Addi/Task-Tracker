import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import Alert from "./Alert";
import axios from "axios";
import DarkModeToggle from "./DarkModeToggle";

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const [isColorsOpen, setIsColorsOpen] = useState(false);

  const inputRef = React.useRef(null);

  const showAlert = (show, msg = "") => {
    setAlert({ show, msg });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Invalid Task Name!");
    } else if (name && isEditing) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId ? { ...task, name: name } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Task Edited.");
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#009688",
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/tasks",
          newTask
        );
        setTasks([...tasks, response.data]);

        showAlert(true, "Task Added.");
        setName("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      showAlert(true, "Task Deleted.");
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setName(taskToEdit.name);
      setIsEditing(true);
      setEditId(taskId);
      inputRef.current.focus();
    }
  };

  const changeColor = (taskId, color) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, color: color } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  const toggleCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const hideColorsContainer = (e) => {
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  const deleteAll = async () => {
    try {
      await axios.delete("http://localhost:8000/tasks");
      setTasks([]);
      showAlert(true, "Your list is clear!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container" onClick={hideColorsContainer}>
        {alert && <Alert msg={alert.msg} />}
        <form className="head" onSubmit={addTask}>
          <input
            type="text"
            ref={inputRef}
            placeholder="New Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{isEditing ? "Edit" : "Add"}</button>
        </form>
        <div className="filter">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-100 p-4 my-2 rounded">
                <p className="text-lg font-semibold">{task.name}</p>
                <p>{task.description}</p>
                <p>{task.dueDate}</p>
                <div>
                  <button onClick={() => editTask(task.id)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </DragDropContext>
        {tasks.length > 0 && (
          <button
            className="btn-delete-all"
            onClick={deleteAll}
            title="Delete All Tasks (Completed and Uncompleted)!"
          >
            Clear All
          </button>
        )}
        <DarkModeToggle />
      </div>
    </>
  );
};

export default TodoPage;
