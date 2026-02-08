import React from "react";
import "../CSS/TeamPage.css";

function TeamPage() {
    const teamMembers = [
        {
            name: "Jordan",
            roles: ["Backend Coding", "Frontend Coding", "Documentation", "Tester"],
            initial: "J"
        },
        {
            name: "Zi Qi",
            roles: ["Frontend Coding", "Documentation", "Tester"],
            initial: "Z"
        },
        {
            name: "Ting Yi",
            roles: ["Backend Coding", "Frontend Coding", "Documentation", "Tester"],
            initial: "T"
        },
        {
            name: "Hakim",
            roles: ["Backend Coding", "Documentation", "Tester"],
            initial: "H"
        },
        {
            name: "Keeve",
            roles: ["Backend Coding", "Documentation", "Tester"],
            initial: "K"
        }
    ];

    return (
        <div className="team-page">
            <div className="team-container">
                <div className="team-header">
                    <h1>Our Team</h1>
                </div>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <h3 className="member-name">{member.name}</h3>
                            <div className="member-roles">
                                {member.roles.map((role, roleIndex) => (
                                    <span 
                                        key={roleIndex} 
                                        className="role-badge"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeamPage;