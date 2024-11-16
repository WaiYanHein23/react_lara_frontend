import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BlogCard = ({ blog, blogs, setBlogs }) => {
  const navigator = useNavigate();
  const deleteBlog = (id) => {
    if (confirm("Are you sure to delete")) {
      const res = fetch("http://127.0.0.1:8000/api/blogs/" + id, {
        method: "DELETE",
      });

      const newBlogs = blogs.filter((blog) => blog.id != id);
      setBlogs(newBlogs);
      toast("Blog delete Successful");
    }
  };
  const showImg = (img) => {
    return img ? "http://127.0.0.1:8000/uploads/blogs/" + img : "No Image";
  };

  return (
    <div className="col-12 col-lg-2">
      <div className="card shadow-lg mt-2">
        <img src={showImg(blog.image)} className="card-img-top " alt="" />

        <div className="card-body ">
          <h6>{blog.title}</h6>
          <small>{blog.shortDesc}</small>

          <div className="d-flex justify-content-between mt-2">
            <button
              className="bg-primary"
              onClick={() => navigator(`/details/${blog.id}`)}
            >
              Details
            </button>

            <button
              className="mx-1 bg-danger"
              onClick={() => deleteBlog(blog.id)}
            >
              Delete
            </button>

            <button
              className="bg-success"
              onClick={() => navigator(`/blog/edit/${blog.id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
