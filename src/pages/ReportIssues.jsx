import React from "react";
import { useState, useContext } from "react";
import { IssueContext } from "../context/IssueContext";
import toast from "react-hot-toast";
import localforage from "localforage";

const ReportIssues = () => {
  const { addIssue } = useContext(IssueContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    imageFile: null, //replaced image with imageFile
  });

  const categories = ["Road", "Water", "Electricity", "Garbage", "Other"];

  //To handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target; //destructruing
    if (name === "image" && files && files[0]) { //files[0] means file object -> FileList[File{name: '...', size:..., type:...}]
      //if user uploded an image
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });  //[name] is dynamic key means name of input filed and their value.
    }
  };  

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = Date.now().toString(); //unique Id
    let imageKey = null;

    //Stores the image file in IndexedDB
    if(formData.imageFile){
      imageKey = `img_${id}`;
      try{
        await localforage.setItem(imageKey,formData.imageFile);
      }catch(err){
        console.error("Error saving image to IndexedDB: ",err);
      }
    }

    //create new issue object

    const newIssue = {
      id,
      title : formData.title,
      description : formData.description,
      location : formData.location,
      category : formData.category,
      imageKey, //reference to the stored blob in IndexedDB
      createdAt : new Date().toISOString(),
      status : "Pending"
    }

    addIssue(newIssue);
    toast.success("Your issue has been submitted 🎉");

    //Reset Form Data
    setFormData({
      title: "",
      description: "",
      location: "",
      category: "",
      imageFile: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Toaster for toast notifications */}
      {/*<Toaster position="top-center" reverseOrder={false}/> */}

      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Report an Issue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/*Title */}
        <div className="mt-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Issue Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus: ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Location */}
        <div className="mt-4">
          <label htmlFor="location" className="block font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            required
            onChange={handleChange}
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div className="mt-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value=" ">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default ReportIssues;
