import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [taskView, setTaskView] = useState('all');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const ChevronDownIcon = getIcon('ChevronDown');
  const ChevronUpIcon = getIcon('ChevronUp');
  const ListChecksIcon = getIcon('ListChecks');
  const FilterIcon = getIcon('Filter');
  const CalendarIcon = getIcon('Calendar');
  const CircleCheckIcon = getIcon('CircleCheck');
  const ClockIcon = getIcon('Clock');
  const LayoutTemplateIcon = getIcon('LayoutTemplate');
  const CheckSquareIcon = getIcon('CheckSquare');
  const FolderIcon = getIcon('Folder');
  const CircleOffIcon = getIcon('CircleOff');
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    toast.success("Task added successfully!");
  };
  
  const updateTask = (updatedTask) => {
    const newTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
    toast.info("Task updated successfully!");
  };
  
  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    toast.error("Task deleted!");
  };
  
  const toggleTaskStatus = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'not started' : 'completed';
        const updatedTask = { ...task, status: newStatus };
        
        if (newStatus === 'completed') {
          toast.success("Task completed! 🎉");
        }
        
        return updatedTask;
      }
      return task;
    });
    
    setTasks(newTasks);
  };
  
  const filterTasks = () => {
    if (taskView === 'all') return tasks;
    if (taskView === 'completed') return tasks.filter(task => task.status === 'completed');
    if (taskView === 'pending') return tasks.filter(task => task.status !== 'completed');
    if (taskView === 'high') return tasks.filter(task => task.priority === 'high');
    if (taskView.startsWith('project:')) return tasks.filter(task => task.project === taskView.split(':')[1]);
    return tasks;
  };
  
  const filteredTasks = filterTasks();
  
  const getTaskCountByStatus = (status) => {
    return tasks.filter(task => task.status === status).length;
  };
  
  const getTaskCountByPriority = (priority) => {
    return tasks.filter(task => task.priority === priority).length;
  };
  
  const getTaskCountByProject = (project) => {
    return tasks.filter(task => task.project === project).length;
  };
  
  const getProjects = () => {
    return [...new Set(tasks.filter(task => task.project).map(task => task.project))];
  };
  
  const viewTask = (task) => {
    setSelectedTask(task);
    setShowDetails(true);
  };
  
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedTask(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center text-primary-dark dark:text-primary-light">
              <ListChecksIcon className="mr-2" size={32} />
              TaskMaster
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mt-2">
              Efficiently manage and organize your tasks
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
            <button
              className={`btn ${taskView === 'all' ? 'btn-primary' : 'btn-outline'} flex items-center justify-center`}
            >
              <LayoutTemplateIcon size={18} className="mr-1" />
              All
            </button>
            <button 
              onClick={() => setTaskView('completed')}
              className={`btn ${taskView === 'completed' ? 'btn-primary' : 'btn-outline'} flex items-center justify-center`}
            >
              <CheckSquareIcon size={18} className="mr-1" />
              Completed
            </button>
            <button 
              onClick={() => setTaskView('pending')}
              className={`btn ${taskView === 'pending' ? 'btn-primary' : 'btn-outline'} flex items-center justify-center`}
            >
              <CircleOffIcon size={18} className="mr-1" />
              Pending
            </button>
            <button 
              onClick={() => setTaskView('high')}
              className={`btn ${taskView === 'high' ? 'btn-primary' : 'btn-outline'} flex items-center justify-center`}
            >
              <FilterIcon size={18} className="mr-1" />
              High Priority
            </button>
            
            <div className="relative group">
              <button className="btn btn-outline flex items-center justify-center">
                <FolderIcon size={18} className="mr-1" />
                Projects
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-surface-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden group-hover:block">
                {getProjects().map(project => (
                  <button
                    key={project}
                    onClick={() => setTaskView(`project:${project}`)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 ${taskView === `project:${project}` ? 'bg-primary/10 text-primary' : ''}`}
                  >{project}</button>
                ))}
              </div>
            </div>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card-neu flex items-center"
        >
          <div className="p-4 rounded-full bg-primary-light/20 dark:bg-primary-dark/30 mr-4">
            <ListChecksIcon size={24} className="text-primary-dark dark:text-primary-light" />
          </div>
          <div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">Total Tasks</p>
            <h3 className="text-2xl font-bold">{tasks.length}</h3>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card-neu flex items-center"
        >
          <div className="p-4 rounded-full bg-secondary-light/20 dark:bg-secondary-dark/30 mr-4">
            <CircleCheckIcon size={24} className="text-secondary-dark dark:text-secondary-light" />
          </div>
          <div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">Completed</p>
            <h3 className="text-2xl font-bold">{getTaskCountByStatus('completed')}</h3>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="card-neu flex items-center"
        >
          <div className="p-4 rounded-full bg-accent/20 dark:bg-accent/30 mr-4">
            <ClockIcon size={24} className="text-accent" />
          </div>
          <div>
            <p className="text-surface-600 dark:text-surface-400 text-sm">High Priority</p>
            <h3 className="text-2xl font-bold">{getTaskCountByPriority('high')}</h3>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <MainFeature addTask={addTask} updateTask={updateTask} selectedTask={selectedTask} />
        </div>
        
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <CalendarIcon size={20} className="mr-2 text-primary" />
                {taskView === 'all' ? 'All Tasks' : 
                 taskView === 'completed' ? 'Completed Tasks' : 
                 taskView === 'pending' ? 'Pending Tasks' :
                 taskView.startsWith('project:') ? `Project: ${taskView.split(':')[1]}` :
                 taskView === 'high' ? 'High Priority Tasks' : 'Tasks'}
              </h2>
              <div className="text-sm text-surface-500">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide">
              {filteredTasks.length > 0 ? filteredTasks.map(task => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${task.status === 'completed' ? 'task-status-completed' : ''} 
                                    ${task.priority === 'high' ? 'task-priority-high' : 
                                      task.priority === 'medium' ? 'task-priority-medium' : 
                                      'task-priority-low'} 
                                    bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 
                                    dark:hover:bg-surface-700 transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <button 
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`p-1 rounded-full ${task.status === 'completed' ? 
                                        'bg-secondary-light/20 text-secondary-dark dark:bg-secondary-dark/30 dark:text-secondary-light' : 
                                        'bg-surface-200 text-surface-500 dark:bg-surface-700 dark:text-surface-400'}`}
                        >
                          {task.status === 'completed' ? 
                            <CircleCheckIcon size={18} /> : 
                            <CircleOffIcon size={18} />}
                        </button>
                      </div>
                      <div>
                        <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-surface-500' : ''}`}>
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full 
                                          ${task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                            {task.priority === 'low' 
                              ? '1' 
                              : task.priority === 'medium' 
                                ? '2' 
                                : '3'
                            }
                          </span>
                          
                          {task.dueDate && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300 flex items-center">
                              <CalendarIcon size={12} className="mr-1" />
                              {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                          )}
                          
                          {task.category && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light">
                              {task.category}
                            </span>
                          )}
                          
                          {task.project && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-light/20 text-secondary-dark dark:bg-secondary-dark/30 dark:text-secondary-light flex items-center">
                              <FolderIcon size={12} className="mr-1" />
                              {task.project}
                            </span>
                          )}
                          
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => viewTask(task)}
                        className="text-surface-500 hover:text-primary transition-colors"
                        aria-label="View task details"
                      >
                        <ChevronDownIcon size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {selectedTask && selectedTask.id === task.id && showDetails && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700"
                    >
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">
                        {task.description || "No description provided."}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => {
                            setSelectedTask(task);
                          }}
                          className="text-xs px-3 py-1 rounded-full bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light"
                        >
                          Edit
                        </button>
                        
                        <button 
                          onClick={() => {
                            deleteTask(task.id);
                            closeDetails();
                          }}
                          className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        >
                          Delete
                        </button>
                        
                        <button 
                          onClick={closeDetails}
                          className="text-xs px-3 py-1 rounded-full bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300 ml-auto"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )) : (
                <div className="text-center py-8">
                  <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-full inline-flex items-center justify-center mb-3">
                    <CalendarIcon size={24} className="text-surface-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No tasks found</h3>
                  <p className="text-surface-500 dark:text-surface-400">
                    {taskView === 'all' ? "You don't have any tasks yet. Add your first task to get started!" : 
                     taskView === 'completed' ? "You haven't completed any tasks yet." : 
                     taskView === 'pending' ? "You don't have any pending tasks." :
                     taskView === 'high' ? "You don't have any high priority tasks." :
                     taskView.startsWith('project:') ? `You don't have any tasks in this project.` : "No tasks match your filter."}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;