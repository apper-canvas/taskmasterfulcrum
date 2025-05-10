import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-surface-100 dark:bg-surface-800 p-5 rounded-full inline-flex">
            <AlertCircleIcon size={50} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-surface-800 dark:text-surface-100">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors duration-200"
        >
          <HomeIcon size={20} className="mr-2" />
          Return Home
        </Link>
        
        <div className="mt-12 text-surface-500 dark:text-surface-500 text-sm">
          <p>Lost? Don't worry. Let's get you back on track.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;