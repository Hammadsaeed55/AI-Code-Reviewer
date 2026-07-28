import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const History = () => {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("reviewHistory")) || [];
        setHistory(storedHistory);
    }, [])

    const handleDelete = (id) => {
        const updatedHistory = history.filter((item) => item.id !== id);
        setHistory(updatedHistory);
        localStorage.setItem("reviewHistory", JSON.stringify(updatedHistory));
        toast.success("History deleted successfully");
    }

    const handleDeleteAll = () => {
        localStorage.removeItem("reviewHistory");
        setHistory([]);
        setShowDeleteModal(false);
        toast.success("All review history deleted successfully..");
    }

    const handleOpenReview = (item) => {
        localStorage.setItem("selectedReview", JSON.stringify(item));
        navigate("/");
    }

    const filteredHistory = history.filter((item) => {
        const searchText = search.toLowerCase();
        return (
            item.language.toLowerCase().includes(searchText) || item.code.toLowerCase().includes(searchText)
        )
    })

    return (
        <div className="p-5">
            <div className="flex item-center justify-between mb-5">
                <h1 className="text-3xl font-bold">
                    Review History
                </h1>
                {
                    history.length > 0 && (
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            Clear All
                        </button>
                    )
                }
            </div>

            <div className="relative mt-5 mb-5">
                <Search size={25} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Seaerch by language or code." value={search} className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 " onChange={(e) => { setSearch(e.target.value) }} />
            </div>

            <div className="space-y-4">
                {filteredHistory.length === 0 ? (
                    <div className="rounded-lg border border-dashed bg-gray-50 p-10 text-center">

                        <h2 className="text-xl font-semibold text-gray-700">
                            🔍 No Reviews Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Try searching with a different keyword.
                        </p>

                    </div>
                ) : (filteredHistory.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleOpenReview(item)}
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
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }} className="rounded-md p-2 text-red-500 hover:bg-red-100">
                                <Trash2 size={25} />
                            </button>
                        </div>
                    </div>
                )))}
            </div>

            {/* create show-delete Model=============================== */}
            {
                showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

                        <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl">

                            <h2 className="text-xl font-bold text-gray-800">
                                Delete All History
                            </h2>

                            <p className="mt-3 text-gray-600">
                                Are you sure you want to delete all review history? This action cannot be undone.
                            </p>

                            <div className="mt-6 flex justify-end gap-3">

                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button onClick={handleDeleteAll}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }
        </div>

    );
};

export default History;