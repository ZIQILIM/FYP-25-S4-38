import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { authFetch } from "../../services/api";

import "../../CSS/CoursePage.css";

function AssessmentPage () {
    const { assessmentId } = useParams(); // Get courseId from URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [startassessment, setStart] = useState(false);
    const [questionList, setQuestions] = useState([]);
    const [wholeAssignment, setWholeAssignment] = useState(null);

    const goBackToCourse = () => {
        navigate("/CoursePage");
    };
    const getQuestions = async () => {
        try {
            console.log(JSON.stringify(assessmentId));
            const res = await authFetch("http://localhost:5000/api/students/getcourseassessment",
                {method: "GET"}, user);
            if(res.success){

                for(let i = 0; i < res.data.length; i++){
                    console.log(res.data[i].id);
                    if(res.data[i].id === assessmentId)
                    {
                        setWholeAssignment(res.data[i]);
                        setQuestions(res.data[i].questions);
                        console.log("Successfully load assignmnet data")
                    }
                }
            }
        }
        catch (error){
            console.error("Error fetching courses:", error);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        //fetch assessment from DB
        
        getQuestions();
      }, [user]);

    if (loading) return <div>Loading assessment...</div>;

      return(
        <div>
            {
                startassessment === false && (
                    //Assessment splashpage
                    <div className="course-page">
                        <button className="modal-btn" onClick={goBackToCourse} >← Back to Courses</button>
                        <h3>{wholeAssignment.title}</h3>
                        <p>You will have {wholeAssignment.timeLimit} minutes to finish this assignment.</p>
                        <button className="modal-btn" onClick={() => setStart(true)} >Start</button>
                    </div>
                )
            }
            {
                startassessment === true && (
                    <div>
                        <h3>{wholeAssignment.title}</h3>
                        {
                            questionList.map((question) => {
                                    return(
                                        <div>
                                            {
                                                //mcq
                                                question.type === "mcq" && (
                                                    <div>
                                                        <p>{question.text}</p>
                                                        <div>
                                                            <input type="radio" id="ans1" name="mcq_qn" value="ans1" />
                                                            <label for="ans1">1) {question.options[0]}</label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="ans2" name="mcq_qn" value="ans2" />
                                                            <label for="ans1">2) {question.options[1]}</label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="ans3" name="mcq_qn" value="ans3" />
                                                            <label for="ans1">3) {question.options[2]}</label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="ans4" name="mcq_qn" value="ans4" />
                                                            <label for="ans1">4) {question.options[3]}</label>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                //short ans
                                            }
                                        </div>
                                    );
                                }
                            )
                        }
                    </div>
                )
            }
        </div>
      )
}

export default AssessmentPage;