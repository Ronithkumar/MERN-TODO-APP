import { FaSpinner } from "react-icons/fa";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-lg text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
