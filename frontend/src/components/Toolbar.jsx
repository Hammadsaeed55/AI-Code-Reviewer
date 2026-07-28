import { LoaderCircle } from "lucide-react";
import { Trash2 } from "lucide-react";

const Toolbar = ({ language, setLanguage, handleReview, loading, handleClear }) => {

  return (
    <div className="mb-3 flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Choose Programming Language
        </label>

        <select className="w-60 rounded-lg border p-2 outline-none" value={language} onChange={(e) => {
          setLanguage(e.target.value)
        }}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="go">Go</option>
          <option value="php">Php</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        {/* clear button=========== */}
        <button
          onClick={handleClear}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
          Clear
        </button>

        {/* review button========== */}
        <button
          onClick={handleReview} disabled={loading} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Reviewing...
            </>
          ) : (
            "Review Code"
          )}
        </button>
      </div>


    </div>
  );
};

export default Toolbar;