import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import UploadImage from "./pages/UploadImage";
import GenreList from "./pages/GenreList";
import AddStaff from "./pages/AddStaff";


function App() {

  return (
    <>
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={< Login />} />
        <Route element={<BaseLayout />}>
          <Route path="/" element={< Home />} />
          <Route path="/add" element={< AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
          <Route path="/movies/:id/upload-image" element={<UploadImage />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/users/add" element={<AddStaff />} />
        </Route>
    </Routes>
  </BrowserRouter>,
  </>
  )

}

export default App
