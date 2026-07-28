import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";
import api from "../services/api";
import ReviewResult from "../components/ReviewResult";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Home = () => {

    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleClear=()=>{
        if(!code.trim() && !review){
            toast.info("Nothing to clear.")
            return;
        }

         setCode("");
         setReview("");
         toast.success("Editor cleared successfully.")
    }

    // fuction for save review history in localStorage
    const saveReviewHistory=(language, code, review)=>{
       const history = JSON.parse(localStorage.getItem("reviewHistory")) || [];
       const newReview = {
        id:Date.now(),
        language,
        code,
        review,
        createdAt:new Date().toISOString(),
       }
       history.unshift(newReview);
       localStorage.setItem("reviewHistory", JSON.stringify(history));
    //    console.log(JSON.parse(localStorage.getItem("reviewHistory")))
    }

    const handleReview = async () => {
        if(!code.trim()){
            toast.error("Please write some code before reviewing.");
            return;
        }
        try {
            setLoading(true)
            const response = await api.post("/review", { language, code })
            console.log(response.data)
            setReview(response.data.review);
            saveReviewHistory(language, code, response.data.review);
        }
        catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message ||"Something went wrong. Please try again.");
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        const selectedReview = JSON.parse(localStorage.getItem("selectedReview"));
        if(selectedReview){
            setLanguage(selectedReview.language);
            setCode(selectedReview.code);
            setReview(selectedReview.review);

            localStorage.removeItem("selectedReview");
        }
    },[]);

    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />

            <div className="p-6">
                <Toolbar
                    language={language}
                    setLanguage={setLanguage}
                    handleReview={handleReview}
                    loading={loading}
                    handleClear={handleClear}
                />
                <div className="mt-6 flex gap-6">
                    <div className="h-[600px] w-1/2 overflow-hidden rounded-lg border bg-white">
                        <CodeEditor language={language} code={code} setCode={setCode} />
                    </div>

                    <div className="h-[600px] w-1/2 rounded-lg border bg-white p-4">
                        <ReviewResult review={review} loading={loading}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;