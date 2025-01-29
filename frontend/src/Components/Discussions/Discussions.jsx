import { useState } from "react";
import Navbar from "../Navbar";
import Allques from "./Allques";
import Myques from "./Myques";

const Discussions = () => {
    const [activeTab, setActiveTab] = useState("allques");

    const renderedContent = () => {
        switch (activeTab) {
            case "allques":
                return <Allques />;
            case "myques":
                return <Myques />;
            default:
                return <Allques />;
        }
    };

    return (
        <>
            <Navbar />
            {/* Small Navigation Bar */}
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
                <button
                    onClick={() => setActiveTab("allques")}
                    style={{
                        padding: "10px 15px",
                        margin: "0 10px",
                        border: "none",
                        cursor: "pointer",
                        background: activeTab === "allques" ? "#007bff" : "#ddd",
                        color: activeTab === "allques" ? "#fff" : "#000",
                        borderRadius: "5px",
                    }}
                >
                    All Questions
                </button>
                <button
                    onClick={() => setActiveTab("myques")}
                    style={{
                        padding: "10px 15px",
                        margin: "0 10px",
                        border: "none",
                        cursor: "pointer",
                        background: activeTab === "myques" ? "#007bff" : "#ddd",
                        color: activeTab === "myques" ? "#fff" : "#000",
                        borderRadius: "5px",
                    }}
                >
                    My Questions
                </button>
            </div>

            <div>{renderedContent()}</div>
        </>
    );
};

export default Discussions;
