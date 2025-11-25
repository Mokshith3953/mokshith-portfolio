import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config"; // Import the URL

const API_URL = `${API_BASE_URL}/portfolio`; // Use the variable

function Admin() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(API_URL);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching portfolio data", err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    loadAdminData();
  }, [navigate]);

  // --- NEW GENERIC HANDLERS ---

  // Handle simple top-level fields like 'about'
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle nested 'contact' object fields
  const handleContactChange = (e) => {
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle changes in an array (skills, projects, education)
  const handleArrayChange = (e, index, section) => {
    const { name, value } = e.target;
    const list = [...formData[section]];
    list[index][name] = value;
    setFormData({
      ...formData,
      [section]: list,
    });
  };

  // Add a new empty item to an array
  const addArrayItem = (section, newItem) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem],
    });
  };

  // Remove an item from an array by its index
  const removeArrayItem = (index, section) => {
    const list = [...formData[section]];
    list.splice(index, 1);
    setFormData({
      ...formData,
      [section]: list,
    });
  };

  // --- Handle Form Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(API_URL, formData, {
        headers: {
          "x-auth-token": token,
        },
      });
      alert("Portfolio Updated Successfully!");
    } catch (err) {
      console.error("Error updating portfolio", err);
      alert("Error updating portfolio. Your session may have expired.");
    }
  };

  if (loading) {
    return <div>Loading admin panel...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Your Portfolio</h2>

      {/* --- ABOUT SECTION --- */}
      <div className="form-section">
        <h3>About Me</h3>
        <label>About Section:</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows="5"
        />
      </div>

      {/* --- CONTACT SECTION --- */}
      <div className="form-section">
        <h3>Contact Info</h3>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.contact.email}
          onChange={handleContactChange}
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.contact.phone}
          onChange={handleContactChange}
        />
        <label>LinkedIn URL:</label>
        <input
          type="text"
          name="linkedin"
          value={formData.contact.linkedin}
          onChange={handleContactChange}
        />
        <label>GitHub URL:</label>
        <input
          type="text"
          name="github"
          value={formData.contact.github}
          onChange={handleContactChange}
        />
      </div>

      {/* --- SKILLS SECTION --- */}
      <div className="array-section">
        <h3>Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="array-item">
            <div className="array-item-header">
              <h4>Skill {index + 1}</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeArrayItem(index, "skills")}
              >
                Remove
              </button>
            </div>
            <label>Skill Name:</label>
            <input
              type="text"
              name="name"
              value={skill.name}
              onChange={(e) => handleArrayChange(e, index, "skills")}
            />
            <label>Level (e.g., 80%):</label>
            <input
              type="text"
              name="level"
              value={skill.level}
              onChange={(e) => handleArrayChange(e, index, "skills")}
            />
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() => addArrayItem("skills", { name: "", level: "" })}
        >
          + Add Skill
        </button>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="array-section">
        <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="array-item">
            <div className="array-item-header">
              <h4>Project {index + 1}</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeArrayItem(index, "projects")}
              >
                Remove
              </button>
            </div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={(e) => handleArrayChange(e, index, "projects")}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={project.description}
              onChange={(e) => handleArrayChange(e, index, "projects")}
            />
            <label>Project Link:</label>
            <input
              type="text"
              name="link"
              value={project.link}
              onChange={(e) => handleArrayChange(e, index, "projects")}
            />
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={project.image}
              onChange={(e) => handleArrayChange(e, index, "projects")}
            />
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() =>
            addArrayItem("projects", {
              title: "",
              description: "",
              link: "",
              image: "",
            })
          }
        >
          + Add Project
        </button>
      </div>

      {/* --- EDUCATION SECTION --- */}
      <div className="array-section">
        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="array-item">
            <div className="array-item-header">
              <h4>Education {index + 1}</h4>
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeArrayItem(index, "education")}
              >
                Remove
              </button>
            </div>
            <label>Degree:</label>
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleArrayChange(e, index, "education")}
            />
            <label>School:</label>
            <input
              type="text"
              name="school"
              value={edu.school}
              onChange={(e) => handleArrayChange(e, index, "education")}
            />
            <label>Year (e.g., 2020-2024):</label>
            <input
              type="text"
              name="year"
              value={edu.year}
              onChange={(e) => handleArrayChange(e, index, "education")}
            />
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() =>
            addArrayItem("education", { degree: "", school: "", year: "" })
          }
        >
          + Add Education
        </button>
      </div>

      {/* --- SUBMIT BUTTON --- */}
      <div className="form-section">
        <button type="submit" className="btn-save">
          Save All Changes
        </button>
      </div>
    </form>
  );
}

export default Admin;
