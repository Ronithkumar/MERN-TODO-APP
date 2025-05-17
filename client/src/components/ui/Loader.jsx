import { FaSpinner } from "react-icons/fa";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-lg text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
