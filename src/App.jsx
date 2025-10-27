import React from "react";
import About from "./components/About";
import Gallery from "./components/Gallery";

const App = () => {
  return (
    <div className="max-h-screen min-h-screen bg-gradient-to-r from-[#111827] to-[#1f2937] flex justify-center items-center p-4">
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1600px]">
        {/* Left Decorative Section -> hidden on small screens */}
        <div className="hidden lg:block lg:w-1/2 bg-[#444444] rounded-3xl shadow-inner shadow-gray-800 border border-blue-100"></div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <About />
          <Gallery />
        </div>
      </div>
    </div>
  );
};

export default App;
