import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("reviewHistory")) || [];
        setHistory(storedHistory);
    }, [])

    const handleDelete=(id)=>{
        const updatedHistory = history.filter((item)=>item.id !== id);
        setHistory(updatedHistory);
        localStorage.setItem("reviewHistory", JSON.stringify(updatedHistory));
        toast.success("History deleted successfully");
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold">
                Review History
            </h1>
            <div className="space-y-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => console.log(item)}
                        className="border rounded-lg mt-3 bg-white p-4 shadow-lg cursor-pointer transition hover:bg-gray-100 flex items-center justify-between pr-10"
                    >
                        <div><h2 className="text-lg font-semibold">
                            {item.language.toUpperCase()}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleString()}
                        </p>

                        <p className="mt-3 line-clamp-2 text-gray-700">
                            {item.code}
                        </p></div>
                        {/* delete button=========== */}
                        <div>
                            <button onClick={(e)=>{ e.stopPropagation();handleDelete(item.id)}} className="rounded-md p-2 text-red-500 hover:bg-red-100">
                                <Trash2 size={25}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;