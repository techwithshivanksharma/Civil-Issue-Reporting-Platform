import React, { useState, useEffect } from "react";
import localforage from "localforage";

const IssueImagePreview = ({ file, imageKey }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    let cancelled = false;

    const loadImage = async () => {
      try {
        //Case 1: If file is File object (newly Upload)
        if (file instanceof File) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
          return () => URL.revokeObjectURL(url);
        }
        //Case 2: If Image key is provided (From IndexedDB)
        if (imageKey) {
          const storedFile = await localforage.getItem(imageKey);
          if (storedFile) {
            const url = URL.createObjectURL(storedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
          } else {
            console.warn("No valid image found for key: ", imageKey);
            if (!cancelled) setPreviewUrl(null);
          }
        }
        //case 3: No Image
        setPreviewUrl(null);
      } catch (err) {
        console.error("Error loading image preview:", err);
        if (!cancelled) setPreviewUrl(null);
      }
    };

    loadImage();
  }, [file, imageKey]);

  if (!previewUrl) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg border">
        No Image Available
      </div>
    );
  }

  return (
    <img
      src={previewUrl}
      alt="Issue"
      className="w-full h-40 object-cover rounded-lg border"
    />
  );
};

export default IssueImagePreview;
