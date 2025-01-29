import { useEffect, useState } from "react";
import axios from "../../Config/axiosConfig";

const Allques = () => {
    const [allquestions, setallquestions] = useState([]);
    const [visibleAnswers, setVisibleAnswers] = useState(null); // Tracks which question's answers are visible

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("/allquestions");
                setallquestions(response.data); // Store data in state
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        fetchQuestions();
    }, []);

    const toggleAnswers = (id) => {
        setVisibleAnswers(visibleAnswers === id ? null : id); // Toggle visibility
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

                        {/* Show answers if this question's answers are visible */}
                        {visibleAnswers === question.id && (
                            <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
                                {question.answers.length > 0 ? (
                                    question.answers.map((answer, index) => (
                                        <p key={index} style={{ background: "#f1f1f1", padding: "5px", borderRadius: "5px" }}>
                                            {answer}
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
        </div>
    );
};

export default Allques;
