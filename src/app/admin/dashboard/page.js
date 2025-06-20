import Dashboard from "@/Components/Admin/Record/Dashboard"
import Navbar from "@/Components/Home/Navbar"
import AdminPrivateRoute from "@/PrivateRoute/AdminPrivateRoute"

const DashboardPage = () => {
  return (
    <>
    <AdminPrivateRoute>
      <Navbar />
      {/* <div className="w-full bg-green-200"> */}
    <Dashboard />
    {/* </div> */}
    </AdminPrivateRoute>
    </>
  )
}

export default DashboardPage