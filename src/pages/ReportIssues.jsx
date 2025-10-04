import React from "react";
import { useState,useContext } from "react";
import { IssueContext } from "../context/IssueContext";
import toast,{Toaster} from "react-hot-toast";

const ReportIssues = () => {

  const {addIssue} = useContext(IssueContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    image: null,
  });

  const categories = ["Road", "Water", "Electricity", "Garbage", "Other"];

  //To handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target; //destructruing
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const newIssue = {
      ...formData,
      id: Date.now(),  //unique id
    };

    console.log(formData);
    addIssue(newIssue); //new issue added to the context
    setFormData({title:"", description:"",location:"", category:"",image: null});
    //alert("Your issue submitted successfully");

    toast.success("Your issue has been submitted 🎉");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Toaster for toast notifications */}
      <Toaster position="top-center" reverseOrder={false}/>

      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Report an Issue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/*Title */}
        <div className='mt-4'>
          <label htmlFor='title' className="block font-medium mb-1">Issue Title</label>
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
        <div className='mt-4'>
          <label htmlFor='description' className="block font-medium mb-1">Description</label>
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
        <div className='mt-4'>
          <label htmlFor='location' className="block font-medium mb-1">Location</label>
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
        <div className='mt-4'>
          <label htmlFor='category' className="block font-medium mb-1">Category</label>
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
          <label htmlFor='image' className="block font-medium mb-1">Upload Image</label>
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
