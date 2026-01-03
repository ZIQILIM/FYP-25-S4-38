import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/authContext";
import { authFetch } from "../services/api";
import "../CSS/InboxPage.css";

function InboxPage() {
    const [activeTab, setActiveTab] = useState("messages");
    return (
        <div className="inbox-page">
            <h2>Inbox</h2>
            <div className="inbox-tabs">
                <button
                    className={activeTab === "all" ? "active" : ""}
                    onClick={() => setActiveTab("all")}
                >
                    All
                </button>
                <button
                    className={activeTab === "messages" ? "active" : ""}
                    onClick={() => setActiveTab("messages")}
                >
                    Messages
                </button>
                <button
                    className={activeTab === "announcement" ? "active" : ""}
                    onClick={() => setActiveTab("announcement")}
                >
                    Announcements
                </button>
            </div>

            <div className="inbox-content">
                {activeTab === "all" && <div>All Notifications Content</div>}
                {activeTab === "messages" && <div>Messages Content</div>}
                {activeTab === "announcement" && <div>Announcements Content</div>}
            </div>
        </div>
    );
}

export default InboxPage;