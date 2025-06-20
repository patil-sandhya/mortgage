import Logs from "@/Components/Admin/Logs/Logs"
import Navbar from "@/Components/Home/Navbar"
import AdminPrivateRoute from "@/PrivateRoute/AdminPrivateRoute"

const LogsPage = () => {
  return (
    <>
    <AdminPrivateRoute>
      <Navbar />
      <Logs />
    </AdminPrivateRoute>
    </>
  )
}

export default LogsPage