import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { Download } from "lucide-react";

const ReviewResult = ({ review, loading }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(review);
            toast.success("Review copied successfully")
        } catch (error) {
            toast.error("Failed to copy review.")
            console.log(error)
        }
    }

    const handleDownload=()=>{
        try{
          const blob = new Blob([review], {type:"text/markdown"});
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "review.md";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success("Review download successfully.");
        }catch(error){
            toast.error("Failed to download.")
            console.log(error)
        }
    }

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                    <p className="text-gray-600 font-medium">
                        AI is reviewing your code...
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="h-full overflow-auto p-4">
            <div className="mb-4 flex items-center justify-end gap-2">
                {review && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <Copy size={18} />
                        Copy
                    </button>
                )}
                
                {
                    review && (
                        <button onClick={handleDownload} className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-white hover:bg-green-600">
                    <Download size={18}/>
                    Download
                </button>
                    )
                }
            </div>

            <div className="max-w-none">
                {
                    review ? <ReactMarkdown>{review}</ReactMarkdown> : "AI review will appear here..."
                }
            </div>
        </div>
    );
};

export default ReviewResult;
