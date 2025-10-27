import React, { useState, useEffect } from "react";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  MessageCircleQuestionMark,
  GripVertical,
} from "lucide-react";

const Gallery = () => {
  // Default images from public folder
  const defaultPics = ["/image1.png", "/image2.png", "/image3.png"];

  const [pics, setPics] = useState(defaultPics);
  const [start, setStart] = useState(0);
  const [active, setActive] = useState(null);
  const SHOW_COUNT = 3;

  // Load uploaded images from localStorage
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

  // Convert to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Upload handler
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
  const showNext = () =>
    start < pics.length - SHOW_COUNT && setStart(start + 1);

  // Toggle grayscale on click (for mobile)
  const toggleActive = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#2b303b] rounded-2xl flex flex-col sm:flex-row p-3 sm:p-4 items-start sm:gap-6 w-full overflow-hidden">
      {/* Sidebar */}
      <div className="flex sm:flex-col justify-between sm:justify-start sm:gap-40 text-[#5C6168] w-full sm:w-auto mb-3 sm:mb-0">
        <MessageCircleQuestionMark className="text-[#5C6168]" />
        <GripVertical className="text-[#5C6168] hidden sm:block" />
      </div>

      {/* Main Section */}
      <div className="bg-[#2b303b] rounded-2xl p-4 sm:p-6 shadow-lg flex-1 min-h-[340px] flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold bg-black text-white px-4 py-2 rounded-xl shadow-inner">
            Gallery
          </h2>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Hidden Input */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />

            {/* Buttons */}
            <button
              onClick={openFileInput}
              className="flex items-center gap-2 bg-[#2b303b] text-white font-bold px-4 py-3 rounded-full text-sm shadow-[0_-2px_8px_rgba(255,255,255,0.25),_0_4px_14px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-transform"
            >
              <Plus size={16} /> Add Image
            </button>

            <button
              onClick={showPrev}
              className="p-2 rounded-full text-white bg-black hover:bg-[#4c5873] shadow-[0_-2px_6px_rgba(255,255,255,0.25),_0_4px_12px_rgba(0,0,0,0.35)] active:scale-95 transition-all"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={showNext}
              className="p-2 rounded-full text-white bg-black hover:bg-[#4c5873] shadow-[0_-2px_6px_rgba(255,255,255,0.25),_0_4px_12px_rgba(0,0,0,0.35)] active:scale-95 transition-all"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex gap-6 m-3 overflow-hidden p-2">
          {pics.slice(start, start + SHOW_COUNT).map((pic, index) => (
            <div
              key={index}
              onClick={() => toggleActive(start + index)}
             
            >
              <img
                src={pic}
                alt={`Pic ${index}`}
                className="rounded-2xl w-48 h-48 object-cover shadow-md filter grayscale  transition-all duration-[800ms] hover:grayscale-0 hover:scale-110 hover:-rotate-6 hover:rounded-3xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
