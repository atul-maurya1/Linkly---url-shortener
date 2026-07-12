import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <aside className="w-65 shrink-0  bg-white">
                <SideBar />
            </aside>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;