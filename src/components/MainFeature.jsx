import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ addTask, updateTask, selectedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    priority: 'medium',
    status: 'not started',
    dueDate: '',
    category: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [categories, setCategories] = useState([
    'Personal', 'Work', 'Shopping', 'Health', 'Finance'
  ]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit');
  const SaveIcon = getIcon('Save');
  const XIcon = getIcon('X');
  const AlertCircleIcon = getIcon('AlertCircle');
  const CheckCircleIcon = getIcon('CheckCircle');
  const FlagIcon = getIcon('Flag');
  const TagIcon = getIcon('Tag');
  const CalendarIcon = getIcon('Calendar');
  const ListPlusIcon = getIcon('ListPlus');
  
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        id: selectedTask.id,
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        priority: selectedTask.priority || 'medium',
        status: selectedTask.status || 'not started',
        dueDate: selectedTask.dueDate || '',
        category: selectedTask.category || '',
      });
      setIsEditing(true);
    }
  }, [selectedTask]);
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length > 100) {
      errors.title = "Title must be less than 100 characters";
    }
    
    if (formData.description && formData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }
    
    return errors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const taskData = {
      ...formData,
      id: formData.id || Date.now().toString(),
      createdDate: formData.createdDate || new Date().toISOString(),
    };
    
    if (isEditing) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
    
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      priority: 'medium',
      status: 'not started',
      dueDate: '',
      category: '',
    });
    setFormErrors({});
    setIsEditing(false);
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      if (categories.includes(newCategory.trim())) {
        toast.warning("This category already exists!");
      } else {
        setCategories(prev => [...prev, newCategory.trim()]);
        setFormData(prev => ({ ...prev, category: newCategory.trim() }));
        toast.success("New category added!");
      }
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };
  
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50';
      default:
        return 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          {isEditing ? (
            <>
              <EditIcon size={20} className="mr-2 text-primary" />
              Edit Task
            </>
          ) : (
            <>
              <PlusIcon size={20} className="mr-2 text-primary" />
              Add New Task
            </>
          )}
        </h2>
        
        {isEditing && (
          <button 
            onClick={resetForm}
            className="text-surface-500 hover:text-red-500 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Cancel editing"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`input-field ${formErrors.title ? 'border-red-500 dark:border-red-500' : ''}`}
          />
          {formErrors.title && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircleIcon size={14} className="mr-1" />
              {formErrors.title}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about this task..."
            rows="3"
            className={`input-field resize-none ${formErrors.description ? 'border-red-500 dark:border-red-500' : ''}`}
          ></textarea>
          {formErrors.description && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircleIcon size={14} className="mr-1" />
              {formErrors.description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1 flex items-center">
              <FlagIcon size={14} className="mr-1 text-surface-500" />
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((priority, index) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority }))}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors
                             ${formData.priority === priority ? getPriorityStyles(priority) : 'bg-surface-50 text-surface-600 border-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:border-surface-700'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1 flex items-center">
              <CalendarIcon size={14} className="mr-1 text-surface-500" />
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1 flex items-center">
            <TagIcon size={14} className="mr-1 text-surface-500" />
            Category
          </label>
          
          <AnimatePresence mode="wait">
            {!showCategoryInput ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(true)}
                  className="absolute right-0 top-0 h-full px-3 text-surface-500 hover:text-primary transition-colors"
                >
                  <ListPlusIcon size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="input-field"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="btn btn-primary"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
            <CheckCircleIcon size={16} className="mr-1" />
            Status: {formData.status === 'completed' ? 'Completed' : 'Not Started'}
          </div>
          
          <div className="flex gap-3">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-outline"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              className="btn btn-primary flex items-center"
            >
              {isEditing ? (
                <>
                  <SaveIcon size={18} className="mr-2" />
                  Update Task
                </>
              ) : (
                <>
                  <PlusIcon size={18} className="mr-2" />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default MainFeature;