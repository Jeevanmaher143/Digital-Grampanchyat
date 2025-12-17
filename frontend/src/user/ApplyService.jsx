import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import './Service.css'
const ApplyService = () => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    serviceType: "",
    fullName: "",
    address: "",
    mobile: ""
  });

  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    setDocuments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("serviceType", formData.serviceType);
    data.append("fullName", formData.fullName);
    data.append("address", formData.address);
    data.append("mobile", formData.mobile);

    for (let i = 0; i < documents.length; i++) {
      data.append("documents", documents[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/services/apply",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMessage(res.data.message);
      setFormData({
        serviceType: "",
        fullName: "",
        address: "",
        mobile: ""
      });
      setDocuments([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="apply-service-container">
      <h2>Apply for Service</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
          <option value="">Select Service</option>
          <option value="Birth Certificate">Birth Certificate</option>
          <option value="Death Certificate">Death Certificate</option>
          <option value="Income Certificate">Income Certificate</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Road & Development">Road & Development</option>
        </select>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required />
        <input type="file" multiple onChange={handleFiles} />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyService;
