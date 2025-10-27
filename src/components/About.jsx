import React, { useState } from "react";
import { MessageCircleQuestionMark, GripVertical } from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("About Me");

  const renderContent = () => {
    switch (activeTab) {
      case "About Me":
        return (
          <p className="leading-relaxed sales-text">
            Hello! I’m Dave, your sales rep here from Salesforce. I’ve been
            working at this awesome company for 3 years now. <br />
            I was born and raised in Albany, NY & have been living in Santa
            Carla for the past 10 years with my wife Tiffany and my 4-year-old
            twin daughters – Emma and Ella. Both of them are just starting
            school, so my calendar is usually blocked between 9–10 AM. <br />
            Outside of work, I enjoy hiking, playing guitar, and exploring new
            tech tools that make life easier!
          </p>
        );
      case "Experiences":
        return (
          <p className="leading-relaxed sales-text">
            Experienced in client relationship management, sales strategy,
            product training, and customer success. Proven record of increasing
            user engagement and closing high-value deals.
          </p>
        );
      case "Recommended":
        return (
          <p className="leading-relaxed sales-text">
            Highly recommended by team members for problem-solving skills, clean
            code, and UI precision. Always ensures responsiveness and
            performance optimization.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#2b303b] rounded-2xl flex p-2">
      {/* Sidebar */}
      <div className="flex flex-col mt-3 items-center gap-40">
        <MessageCircleQuestionMark className="text-[#5C6168]" />
        <GripVertical className="text-[#5C6168]" />
      </div>

      {/* Main Card */}
      <div className="bg-[#2b303b] rounded-2xl p-4 shadow-lg min-h-[340px] flex flex-col w-full">
        {/* Tabs */}
        <div className="flex bg-[#1f2433] rounded-2xl sales-text text-2xl p-1 mb-4">
          {["About Me", "Experiences", "Recommended"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm py-2 rounded-2xl transition-all ${
                activeTab === tab
                  ? "bg-[#3b465a] text-white font-semibold shadow-inner"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-2 rounded-xl shadow-inner overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent max-h-[180px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default About;
