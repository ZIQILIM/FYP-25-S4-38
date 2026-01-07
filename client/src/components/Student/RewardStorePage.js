import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/authContext";
import { authFetch } from "../../services/api";

import "../../CSS/CourseEditorPage.css"; // Reusing grid styles
import "../../CSS/CoursePage.css";

function RewardStorePage() {

    const [rewardID, setRewardID] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // controls popup visibility

    const openRewardDetails = (rewardtag) => {
        setRewardID(rewardtag);
        setIsModalOpen(true);

    }

    return(
        <div className="course-page">
            <h1>Rewards Store</h1>
            <p>Redeem your points for prizes</p>

            <div className="courses-grid">
                <div
                    className="course-card"
                    onClick={() => openRewardDetails("5NTUC")}
                >
                    <div
                        className="course-card-image"
                        style={{
                        backgroundImage: `url('https://placehold.co/600x400')`,
                        }}
                    ></div>
                    <div className="course-card-content">
                        <h3>$5 FairPrice Voucher</h3>
                    </div>
                </div>


                <div
                    className="course-card"
                    onClick={() => openRewardDetails("10NTUC")}
                >
                    <div
                        className="course-card-image"
                        style={{
                        backgroundImage: `url('https://placehold.co/600x400')`,
                        }}
                    ></div>
                    <div className="course-card-content">
                        <h3>$10 FairPrice Voucher</h3>
                    </div>
                </div>

                <div
                    className="course-card"
                    onClick={() => openRewardDetails("1YOffice365")}
                >
                    <div
                        className="course-card-image"
                        style={{
                        backgroundImage: `url('https://placehold.co/600x400')`,
                        }}
                    ></div>
                    <div className="course-card-content">
                        <h3>1 Year Microsoft Office Subscription</h3>
                    </div>
                </div>
            </div>

            {isModalOpen ? (
                <div className="modal-overlay">
                        {rewardID === "5NTUC" && (
                                <div className="course-modal-box">
                                    <div className="course-modal-header"> 
                                        <div className="course-title-row">
                                            $5 FairPrice Voucher
                                        </div>
                                        <div className="course-desc">
                                            $5 NTUC FairPrice Voucher redeemable at FiarPrice Supermarkets
                                        </div>
                                    </div>
                                    
                                    <div className="course-modal-footer">
                                        <button className="modal-btn" /*onClick={handleEnroll}*/>
                                            Redeem Reward
                                        </button>
                                        <button className="text-btn" onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        {rewardID === "10NTUC" && (
                                <div className="course-modal-box">
                                    <div className="course-modal-header"> 
                                        <div className="course-title-row">
                                            $10 FairPrice Voucher
                                        </div>
                                        <div className="course-desc">
                                            $10 NTUC FairPrice Voucher redeemable at FiarPrice Supermarkets
                                        </div>
                                    </div>
                                    <div className="course-modal-footer">
                                        <button className="modal-btn" /*onClick={handleEnroll}*/>
                                            Redeem Reward
                                        </button>
                                        <button className="text-btn" onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        {rewardID === "1YOffice365" && (
                                <div className="course-modal-box">
                                    <div className="course-modal-header"> 
                                        <div className="course-title-row">
                                            1 Year Microsoft Office Subscription
                                        </div>
                                        <div className="course-desc">
                                            1 year subscription to microsoft office.
                                        </div>
                                    </div>
                                    
                                    <div className="course-modal-footer">
                                        <button className="modal-btn" /*onClick={handleEnroll}*/>
                                            Redeem Reward
                                        </button>
                                        <button className="text-btn" onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                </div>
                
            ) : (null)}
        </div>
    );
}

export default RewardStorePage;