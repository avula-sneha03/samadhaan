import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Home = () => {
    const userName = localStorage.getItem("userName"); // Assuming userName is stored in localStorage
    const navigate = useNavigate();

    // State to manage the selected story
    const [selectedStory, setSelectedStory] = useState(null);

    // Sample data for individuals who overcame depression
    const successStories = [
        {
            name: "John Doe",
            initialSymptoms: "Feeling hopeless, lack of energy, and social withdrawal.",
            medications: "Therapy sessions, antidepressants.",
            steps: "Regular exercise, mindfulness practices, and joining a support group.",
            story: "With therapy and support, John regained his confidence and now helps others as a mental health advocate.",
        },
        {
            name: "Jane Smith",
            initialSymptoms: "Persistent sadness, insomnia, and loss of appetite.",
            medications: "Cognitive Behavioral Therapy (CBT), sleep aids.",
            steps: "Journaling, therapy, and maintaining a healthy diet.",
            story: "Jane found solace in journaling and therapy, and now she runs a blog to inspire others.",
        },
        {
            name: "Michael Brown",
            initialSymptoms: "Anxiety, irritability, and difficulty concentrating.",
            medications: "Anti-anxiety medications, counseling.",
            steps: "Mindfulness practices, yoga, and time management techniques.",
            story: "Michael overcame his struggles through mindfulness practices and is now a motivational speaker.",
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h1>Welcome {userName ? userName : "to Samadhaan"}!</h1>
                <p>Your platform to ask questions, find answers, and share knowledge.</p>

                {/* Modal-like overlay for selected story */}
                {selectedStory && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            color: "white",
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "20px",
                                borderRadius: "8px",
                                maxWidth: "600px",
                                width: "90%",
                                textAlign: "left",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <h2 style={{ color: "#007bff" }}>{selectedStory.name}</h2>
                            <p><strong>Initial Symptoms:</strong> {selectedStory.initialSymptoms}</p>
                            <p><strong>Medications:</strong> {selectedStory.medications}</p>
                            <p><strong>Steps Followed:</strong> {selectedStory.steps}</p>
                            <p>{selectedStory.story}</p>
                            <button
                                onClick={() => setSelectedStory(null)} // Close the overlay
                                style={{
                                    padding: "10px",
                                    background: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* First Row: Buttons */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
                    <button
                        onClick={() => navigate("/discussions")}
                        style={{
                            padding: "10px 20px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Ask a Question
                    </button>
                    <button
                        onClick={() => navigate("/discussions")}
                        style={{
                            padding: "10px 20px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        View Discussions
                    </button>
                </div>

                {/* Second Row: Success Stories */}
                <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
                    {successStories.map((story, index) => (
                        <div
                            key={index}
                            style={{
                                width: "300px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "20px",
                                textAlign: "left",
                            }}
                        >
                            <h3 style={{ color: "#6c757d" }}>{story.name}</h3>
                            <p><strong>Initial Symptoms:</strong> {story.initialSymptoms}</p>
                            <button
                                onClick={() => setSelectedStory(story)} // Show full details
                                style={{
                                    padding: "10px",
                                    background: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;