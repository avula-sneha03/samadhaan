import { useEffect, useState } from "react";
import axios from "../../Config/axiosConfig";

const Myques = () => {
    const [myQuestions, setMyQuestions] = useState([]);
    const [visibleAnswers, setVisibleAnswers] = useState(null); // Tracks which question's answers are visible
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility for asking questions
    const [newQuestion, setNewQuestion] = useState(""); // Stores the new question input
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Controls update modal visibility
    const [currentQuestionId, setCurrentQuestionId] = useState(null); // Stores the ID of the question being updated

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get("/myquestions");
            setMyQuestions(response.data); // Store data in state
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    const toggleAnswers = (id) => {
        setVisibleAnswers(visibleAnswers === id ? null : id); // Toggle visibility
    };

    const handleAskQuestion = async () => {
        if (!newQuestion.trim()) {
            alert("Question cannot be empty!");
            return;
        }

        try {
            await axios.post("/addquestion", { content: newQuestion });
            setNewQuestion(""); // Clear input
            setIsModalOpen(false); // Close modal
            fetchQuestions(); // Refresh questions list
        } catch (error) {
            console.log("Error adding question", error);
        }
    };

    const handleUpdateQuestion = async () => {
        if (!newQuestion.trim()) {
            alert("Question cannot be empty!");
            return;
        }

        try {
            await axios.post(`/updatequestion/${currentQuestionId}`, { content: newQuestion });
            setNewQuestion(""); // Clear input
            setIsUpdateModalOpen(false); // Close update modal
            fetchQuestions(); // Refresh questions list
        } catch (error) {
            console.log("Error updating question", error);
        }
    };

    const openUpdateModal = (questionId, questionContent) => {
        setCurrentQuestionId(questionId);
        setNewQuestion(questionContent); // Pre-fill the input with the current question content
        setIsUpdateModalOpen(true); // Open the update modal
    };

    const handleDeleteQuestion = async (questionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/deletequestion/${questionId}`);
            fetchQuestions(); // Refresh questions list after deletion
        } catch (error) {
            console.log("Error deleting question", error);
        }
    };

    return (
        <div>
            <h2>My Questions</h2>
            
            {/* Ask Question Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    marginBottom: "15px",
                    padding: "10px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Ask a Question
            </button>

            {myQuestions.length === 0 ? (
                <p>Loading...</p>
            ) : (
                myQuestions.map((question) => (
                    <div key={question.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                        <p>{question.content}</p>
                        <button onClick={() => toggleAnswers(question.id)}>
                            {visibleAnswers === question.id ? "Hide Answers" : "Show Answers"}
                        </button>
                        <button onClick={() => openUpdateModal(question.id, question.content)} style={{ marginLeft: "10px" }}>
                            Update Question
                        </button>
                        <button onClick={() => handleDeleteQuestion(question.id)} style={{ marginLeft: "10px", background: "red", color: "white" }}>
                            Delete Question
                        </button>

                        {/* Show answers if this question's answers are visible */}
                        {visibleAnswers === question.id && (
                            <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
                                {question.answers.length > 0 ? (
                                    question.answers.map((answer, index) => (
                                        <p key={index} style={{ background: "#f1f1f1", padding: "5px", borderRadius: "5px" }}>
                                            {answer.content}
                                        </p>
                                    ))
                                ) : (
                                    <p>No answers yet.</p>
 )}
                            </div>
                        )}
                    </div>
                ))
            )}

            {/* Ask Question Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
                        <h3>Ask a Question</h3>
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            rows="4"
                            style={{ width: "100%", padding: "5px" }}
                            placeholder="Type your question..."
                        />
                        <br />
                        <button
                            onClick={handleAskQuestion}
                            style={{ padding: "8px", marginTop: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{ padding: "8px", marginLeft: "10px", background: "gray", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Update Question Modal */}
            {isUpdateModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
                        <h3>Update Question</h3>
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            rows="4"
                            style={{ width: "100%", padding: "5px" }}
                            placeholder="Update your question..."
                        />
                        <br />
                        <button
                            onClick={handleUpdateQuestion}
                            style={{ padding: "8px", marginTop: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Update
                        </button>
                        <button
                            onClick={() => {setIsUpdateModalOpen(false);setNewQuestion("")}}
                            style={{ padding: "8px", marginLeft: "10px", background: "gray", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Myques;