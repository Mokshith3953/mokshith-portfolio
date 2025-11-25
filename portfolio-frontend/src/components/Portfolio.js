import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolio';

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(API_URL);
        setPortfolio(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching portfolio data", err);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  if (!portfolio) {
    return <div>No portfolio data found.</div>;
  }

  return (
    <div>
      {/* --- ABOUT SECTION --- */}
      <div className="portfolio-section">
        <h2>About Me</h2>
        <p className="about-text">{portfolio.about}</p>
      </div>

      {/* --- SKILLS SECTION --- */}
      <div className="portfolio-section">
        <h2>Skills</h2>
        <div className="skills-container">
          {portfolio.skills.map((skill) => (
            <div key={skill._id} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="portfolio-section">
        <h2>Projects</h2>
        <div className="projects-container">
          {portfolio.projects.map((project) => (
            <div key={project._id} className="project-card">
              {project.image && <img src={project.image} alt={project.title} className="project-image" />}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-project">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* --- EDUCATION SECTION --- */}
      <div className="portfolio-section">
        <h2>Education</h2>
        <div className="education-container">
          {portfolio.education.map((edu) => (
            <div key={edu._id} className="education-item">
              <h3>{edu.degree}</h3>
              <p>{edu.school}</p>
              <span className="education-year">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- CONTACT SECTION --- */}
      <div className="portfolio-section">
        <h2>Contact</h2>
        <div className="contact-links">
          <a href={`mailto:${portfolio.contact.email}`}>Email</a>
          <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <p>Phone: {portfolio.contact.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;