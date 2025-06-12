import React, { useState } from "react";

const CopyLinkButton = ({ link }) => {
  const [copyStatus, setCopyStatus] = useState("Copy Link");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus("Copied Link !");
    //   setTimeout(() => setCopyStatus("Copy"), 2000); // Reset after 2 seconds
    } catch (err) {
      setCopyStatus("Failed to copy");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      className="block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
      onClick={handleCopy}
    >
      {copyStatus}
    </button>
  );
};

export default CopyLinkButton;
