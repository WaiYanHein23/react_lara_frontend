import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BlogDetails = () => {
  const params = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/blogs/" + params.id);
      const result = await res.json();
      setDetail(result.data);
    };
    fetchBlog();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-5 mb-5">
        <h4>Blogs</h4>
        <a href="/">Back</a>
      </div>
      <div className="row mb-4 bg-warning">
        <h4 className="my-3">{detail.title}</h4>
        {detail.image && (
          <img
            className="w-25"
            src={`http://127.0.0.1:8000/uploads/blogs/${detail.image}`}
            alt=""
          />
        )}
        <h6 className="my-3">
          <p className="fst-italic">Short Description</p>
          <small className="text-white">{detail.shortDesc}</small>
        </h6>
        <h6 className="my-3">
          <p>Description</p>
          <small className="text-white"> {detail.description}</small>
        </h6>
      </div>
    </div>
  );
};
