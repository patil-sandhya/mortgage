import Navbar from "@/Components/Home/Navbar"
import Records from "@/Components/User/Records"
import PrivateRoute from "@/PrivateRoute/PrivateRoute"

const RecordsPage = () => {
  return (
    <>
    <PrivateRoute>
      <Navbar />
    <Records />
    </PrivateRoute>
    </>
  )
}

export default RecordsPage