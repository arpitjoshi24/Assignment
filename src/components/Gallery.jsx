import React, { useState, useEffect } from "react";
import { Plus, ArrowLeft, ArrowRight, MessageCircleQuestionMark, GripVertical } from "lucide-react";

const Gallery = () => {
  const defaultPics = ["/image1.png", "/image2.png", "/image3.png"];
  const [pics, setPics] = useState(defaultPics);
  const [start, setStart] = useState(0);
  const [active, setActive] = useState(null);
  const SHOW_COUNT = 3;

  useEffect(() => {
    const saved = localStorage.getItem("uploadedPics");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPics([...defaultPics, ...parsed]);
      } catch {
        setPics(defaultPics);
      }
    }
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newPics = await Promise.all(files.map((f) => toBase64(f)));
    setPics((prev) => [...prev, ...newPics]);

    const stored = localStorage.getItem("uploadedPics");
    const prev = stored ? JSON.parse(stored) : [];
    const updated = [...prev, ...newPics];
    localStorage.setItem("uploadedPics", JSON.stringify(updated));

    e.target.value = "";
  };

  const openFileInput = () => document.getElementById("fileInput").click();
  const showPrev = () => start > 0 && setStart(start - 1);
  const showNext = () => start < pics.length - SHOW_COUNT && setStart(start + 1);
  const toggleActive = (index) => setActive((prev) => (prev === index ? null : index));

  return (
    <div className="bg-[#2b303b] rounded-2xl flex flex-col sm:flex-row p-3 sm:p-4 gap-3 sm:gap-4 shadow-md w-full">
      {/* Sidebar */}
      <div className="flex sm:flex-col justify-between sm:justify-start sm:gap-32 items-center text-[#5C6168]">
        <MessageCircleQuestionMark size={20} />
        <GripVertical className="hidden sm:block" size={20} />
      </div>

      {/* Main Section */}
      <div className="bg-[#2b303b] rounded-2xl p-4 sm:p-6 shadow-lg flex-1 flex flex-col min-h-[300px] sm:min-h-[340px]">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <h2 className="text-base sm:text-lg font-semibold bg-black text-white px-4 py-2 rounded-xl shadow-inner">
            Gallery
          </h2>

          <div className="flex flex-wrap gap-2 items-center">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />

            <button
              onClick={openFileInput}
              className="flex items-center gap-2 bg-[#2b303b] text-white font-bold px-3 py-2 sm:px-4 sm:py-3 rounded-full text-xs sm:text-sm shadow-[0_-2px_8px_rgba(255,255,255,0.25),_0_4px_14px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-transform"
            >
              <Plus size={16} /> Add Image
            </button>

            <button
              onClick={showPrev}
              className="p-2 sm:p-3 rounded-full text-white bg-black hover:bg-[#4c5873] shadow-md active:scale-95 transition-all"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={showNext}
              className="p-2 sm:p-3 rounded-full text-white bg-black hover:bg-[#4c5873] shadow-md active:scale-95 transition-all"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 p-2">
          {pics.slice(start, start + SHOW_COUNT).map((pic, index) => (
            <div key={index} onClick={() => toggleActive(start + index)}>
              <img
                src={pic}
                alt={`Pic ${index}`}
                className={`rounded-2xl w-32 h-32 sm:w-48 sm:h-48 object-cover shadow-md transition-all duration-700 ${
                  active === start + index
                    ? "grayscale-0 scale-110 rotate-0"
                    : "grayscale hover:grayscale-0 hover:scale-105 hover:-rotate-3"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
