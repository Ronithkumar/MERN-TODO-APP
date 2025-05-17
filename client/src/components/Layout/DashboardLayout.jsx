import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="pt-16 p-6 bg-gray-100 flex-grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
