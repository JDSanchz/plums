// TaskContext.js
import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = async (taskData) => {
    // Send taskData to the database using Prisma
    // Assuming you have a function to send the data to your backend
    await sendTaskToDatabase(taskData);

    // Update the local state to include the new task
    setTasks((currentTasks) => [...currentTasks, taskData]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
