import Batch from "@/Components/Admin/Batch/Batch"
import Navbar from "@/Components/Home/Navbar"
import AdminPrivateRoute from "@/PrivateRoute/AdminPrivateRoute"

const BatchPage = () => {
  return (
    <>
    <AdminPrivateRoute>
      <Navbar />
      <Batch />
    </AdminPrivateRoute>
    </>
  )
}

export default BatchPage