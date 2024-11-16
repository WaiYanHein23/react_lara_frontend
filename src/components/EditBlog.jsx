import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const EditBlog = () => {
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [html, setHtml] = useState("");
  const [imageId, setImageId] = useState("");
  const navigator = useNavigate();

  //Image Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://127.0.0.1:8000/api/temp_image", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.status == false) {
      alert(result.errors.image);
      e.target.value = null;
    }

    setImageId(result.data.id);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/blogs/" + params.id);
      const result = await res.json();
      setDetail(result.data);
      setHtml(result.data.description);
      reset(result.data);
    };
    fetchBlog();
  }, []);

  //Form Submit
  const formSubmit = async (data) => {
    const newData = { ...data, description: html, image_id: imageId };
    const res = await fetch("http://127.0.0.1:8000/api/blogs/" + params.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    toast("Blogs Updated Successful");
    navigator("/");
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-5 mb-5">
        <h4>Edit Blogs</h4>
        <a href="/">Back</a>
      </div>
      <div className="card shadow-lg bottom-1">
        {/* form */}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="m-3">
              <label htmlFor="" className="m-2 form-label">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Enter Title"
                className={`form-control ${errors.title && "is-invalid"}`}
              />
              {errors.title && (
                <p className="is-invalid text-danger">The field is required</p>
              )}
            </div>

            <div className="m-3">
              <label htmlFor="" className="m-2 form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDesc")}
                className="form-control"
                id=""
              ></textarea>
            </div>

            <div className="m-3">
              <label htmlFor="" className="m-2 form-label">
                Description
              </label>
              <textarea
                {...register("description")}
                className="form-control"
                id=""
                value={html}
                onChange={(e) => setHtml(e.target.value)}
              ></textarea>
            </div>

            <div className="m-3">
              <label htmlFor="form-label " className="form-label">
                Image
              </label>

              <input onChange={handleFileChange} type="file" />
              <div className="mt-4">
                {detail.image && (
                  <img
                    className="w-25 "
                    src={`http://127.0.0.1:8000/uploads/blogs/${detail.image}`}
                    alt=""
                  />
                )}
              </div>
            </div>

            <div className="m-3">
              <label htmlFor="" className="m-2 form-label">
                Author
              </label>
              <input
                {...register("author", { required: true })}
                type="text"
                placeholder="Enter Author"
                className={`form-control ${errors.author && "is-invalid"}`}
              />
              {errors.author && (
                <p className="is-invalid text-danger">The field is required</p>
              )}
            </div>

            <button className="btn btn-primary">Update</button>
          </div>
        </form>
        {/* form / */}
      </div>
    </div>
  );
};
