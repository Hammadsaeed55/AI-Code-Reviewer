import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";
import api from "../services/api";
import ReviewResult from "../components/ReviewResult";

const Home = () => {

    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("// Write your code here...");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleReview = async () => {
        try {
            setLoading(true)
            const response = await api.post("/review", { language, code })
            console.log(response.data)
            setReview(response.data.review);
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />

            <div className="p-6">
                <Toolbar
                    language={language}
                    setLanguage={setLanguage}
                    handleReview={handleReview}
                    loading={loading}
                />
                <div className="mt-6 flex gap-6">
                    <div className="h-[600px] w-1/2 overflow-hidden rounded-lg border bg-white">
                        <CodeEditor language={language} code={code} setCode={setCode} />
                    </div>

                    <div className="h-[600px] w-1/2 rounded-lg border bg-white p-4">
                        <ReviewResult review={review}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;