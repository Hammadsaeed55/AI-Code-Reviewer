import ReactMarkdown from "react-markdown";

const ReviewResult = ({ review }) => {
    return (
        <div className="h-full overflow-auto p-4">
            <div className="max-w-none">
                {
                    review ? <ReactMarkdown>{review}</ReactMarkdown> : "AI review will appear here..."
                }
            </div>
        </div>
    );
};

export default ReviewResult;
