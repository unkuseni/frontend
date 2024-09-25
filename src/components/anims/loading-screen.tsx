import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Using Lucide React for the loading icon

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-blue-500 dark:text-blue-400" />
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
