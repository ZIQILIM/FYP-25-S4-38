import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../auth/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../CSS/ProfilePage.css";



function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    console.log("Current User in ProfilePage:", user);
    useEffect(() => {
     if (!user) return; 

    const loadProfileData = async () => {
         console.log("Fetching profile for UID:", user.uid);
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
             console.log("Profile data:", snap.data());
        setProfileData(snap.data());
        } else {
            console.log("No profile found for UID:", user.uid);
        }
    };
    loadProfileData();
    }, [user]);

    if(!profileData) {
        return <div>Loading profile...</div>;
    }

    const displayName = `${profileData.firstName} ${profileData.lastName}`;
    return(
        <div className="profile-Page">
            <div className="profile-container">

                {/* LEFT SECTION */}
                <div className="left-section">
                    
                    {/* Profile header */}
                    <div className="profile-header">
                    <div className="profile-avatar"></div>

                    <div>
                        <h1 className="profile-name">{displayName}</h1>
                        <p className="profile-role">{profileData.role}</p>
                    </div>
                    </div>

                    {/* About me */}
                    <div className="about-section">
                    <h2>About me</h2>
                    <p className="about-placeholder"></p>
                    </div>

                    {/* Completed courses */}
                    <div className="courses-section">
                    <h2>Completed courses</h2>
                    <ul>
                        
                    </ul>
                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className="right-section">

                    {/* Badges */}
                    <div className="badges-section">
                    <h2>Badges</h2>
                    <div className="badges-container">
                        {/* Example badges */}
                        <div className="badge">🏅</div>
                        <div className="badge">🎖️</div>
                        <div className="badge">🥇</div>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="action-buttons">
                    <button>View reviews</button>
                    <button>Course recommendations</button>
                    <button>Edit account</button>
                    <button>Student weaknesses</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ProfilePage;