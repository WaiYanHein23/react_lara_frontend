import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/blogs");
      const result = await res.json();
      setBlogs(result.data);
    };
    fetchBlogs();
  }, [blogs]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-5 mb-5">
        <h4>Blogs</h4>
        <a href="/create">Create</a>
      </div>
      <div className="row mb-4">
        {blogs &&
          blogs.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                blogs={blogs}
                setBlogs={setBlogs}
                blog={blog}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
