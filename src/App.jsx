import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from "./components/BlogCard";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import CreateBlogs from "./components/CreateBlogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogDetails } from "./components/BlogDetails";
import { EditBlog } from "./components/EditBlog";
function App() {
  return (
    <>
      <div className="bg-primary py-2 text-center shadow-md">
        <h1 className="text-white">React & Laravel Blog</h1>
      </div>
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/create" element={<CreateBlogs />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/details/:id" element={<BlogDetails />}></Route>
        <Route path="/blog/edit/:id" element={<EditBlog />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
