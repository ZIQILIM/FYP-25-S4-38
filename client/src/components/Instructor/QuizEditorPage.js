import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../auth/authContext";
import { authFetch } from "../../services/api";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, resolvePath, useNavigate } from "react-router-dom";

function QuizEditorPage(){
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
     // --- VIEW STATE ---
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedCourseQuiz, setCourseQuiz] = useState(null);

    const navigate = useNavigate();

     // === DATA FETCHING ===
      const fetchCourses = async () => {
        try {
          const res = await authFetch(
            "http://localhost:5000/api/instructors/my-courses",
            {},
            user
          );
          if (res.success) setCourses(res.data);
    
          if (selectedCourse) {
            const updated = res.data.find((c) => c.id === selectedCourse.id);
            if (updated) setSelectedCourse(updated);
          }

          if(selectedCourseQuiz){

          }
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        if (user) fetchCourses();
      }, [user]);

    return (
        <div>
            <button className="back-link" onClick={() => navigate("/CourseEditorPage")}>
            ← Back to Course Dashboard
          </button>
            <h1>Quiz Editor</h1>
        </div>
    );
}

export default QuizEditorPage;