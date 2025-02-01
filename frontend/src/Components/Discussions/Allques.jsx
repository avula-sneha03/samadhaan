import { useEffect, useState } from "react";
import axios from "../../Config/axiosConfig";

const Allques = () => {
    const [allquestions, setallquestions] = useState([]);
    const [visibleAnswers, setVisibleAnswers] = useState(null); // Tracks which question's answers are visible
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false); // Controls modal visibility for adding answers
    const [newAnswer, setNewAnswer] = useState(""); // Stores the new answer input
    const [currentQuestionId, setCurrentQuestionId] = useState(null); // Stores the ID of the question being answered

    useEffect(() => {
        fetchQuestions(); // Fetch questions on mount
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get("/allquestions");
            setallquestions(response.data); // Store data in state
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    const toggleAnswers = (id) => {
        setVisibleAnswers(visibleAnswers === id ? null : id); // Toggle visibility
    };

    const handleAnswerChange = (value) => {
        setNewAnswer(value); // Update the answer input
    };

    const handleAddAnswer = async () => {
        const answer = { content: newAnswer }; // Assuming the answer object has a 'content' field

        try {
            await axios.post(`/addanswer/${currentQuestionId}`, answer);
            setNewAnswer(""); // Clear input after submission
            setIsAnswerModalOpen(false); // Close the modal
            fetchQuestions(); // Refresh questions list
        } catch (error) {
            if(error.status==409)
                alert(error.response.data);
        }
    };

    const openAnswerModal = (questionId) => {
        setCurrentQuestionId(questionId); // Set the current question ID
        setIsAnswerModalOpen(true); // Open the answer modal
    };

    return (
        <div>
            <h2>All Questions</h2>
            {allquestions.length === 0 ? (
                <p>Loading...</p>
            ) : (
                allquestions.map((question) => (
                    <div key={question.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                        <p>{question.content}</p>
                        <button onClick={() => toggleAnswers(question.id)}>
                            {visibleAnswers === question.id ? "Hide Answers" : "Show Answers"}
                        </button>
                        <button onClick={() => openAnswerModal(question.id)} style={{ marginLeft: "10px" }}>
                            Add Answer
                        </button>

                        {/* Show answers if this question's answers are visible */}
                        {visibleAnswers === question.id && (
                            <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
                                {question.answers.length > 0 ? (
                                    question.answers.map((answer, index) => (
                                        <p key={index} style={{ background: "#f1f1f1", padding: "5px", borderRadius: "5px" }}>
                                            {answer.content} {/* Assuming answer has a 'content' field */}
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

            {/* Add Answer Modal */}
            {isAnswerModalOpen && (
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
                        <h3>Add Answer</h3>
                        <div style={{width:"100%"}}>
                        <textarea
                            value={newAnswer}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            rows="4"
                            style={{width:"100%"}}
                            placeholder="Type your answer..."
                        />
                        </div>
                        <br />
                        <button
                            onClick={handleAddAnswer}
                            style={{ padding: "8px", marginTop: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setIsAnswerModalOpen(false)}
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

export default Allques;