import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/authContext";
import { authFetch } from "../../services/api";

import "../../CSS/CourseEditorPage.css"; // Reusing grid styles
import "../../CSS/CoursePage.css";

function InternshipListPage() {
  const { user } = useContext(AuthContext); // get logged in use information
  const [loading, setLoading] = useState(true);
  const [internshiplist, setInternList] = useState([]);

  // Modal State
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // controls popup visibility

  const openInternDetails = (intern) => {
    setSelectedIntern(intern);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user) fetchInternships();
  }, [user]);

  //fetch all internships
  const fetchInternships = async () => {
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/students/internships`,
        {},
        user,
      );
      if (res.success) {
        setInternList(res.data);
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Internships...</div>;
  return (
    <div className="course-page">
      <h1>Internship List</h1>
      <p>View Available Internships.</p>
      <div className="courses-grid">
        {internshiplist.map((intern) => {
          return (
            <div
              key={intern.id}
              className="course-card"
              onClick={() => openInternDetails(intern)}
            >
              <div
                className="course-card-image"
                style={{
                  backgroundImage: `url('https://placehold.co/600x400?text=${intern.title.charAt(
                    0,
                  )}')`,
                }}
              ></div>
              <div className="course-card-content">
                <h3>{intern.title}</h3>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Company: {intern.company}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && selectedIntern && (
        <div className="modal-overlay">
          <div className="course-modal-box">
            <div className="course-title-row">
              <h2>{selectedIntern.title}</h2>
            </div>
            <div className="course-instructor">
              <strong>🧑‍🏫Company:</strong> {selectedIntern.company}
            </div>
            <div className="course-desc">{selectedIntern.description}</div>
            <div className="course-modal-footer">
              <button
                className="text-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternshipListPage;
