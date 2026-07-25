const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 border-b shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600 text-xl text-white">
          🤖
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Code Reviewer
          </h1>
          <p className="text-sm text-gray-500">
            Review your code with AI
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;