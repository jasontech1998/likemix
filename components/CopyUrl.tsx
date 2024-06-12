"use client";
import React from "react";

import { Button } from "./ui/button";
import { Copy } from 'lucide-react';

interface CopyUrlProps {
  url: string;
}

const CopyUrl: React.FC<CopyUrlProps> = ({ url }) => {
  const copyToClipboard = () => {
    console.log("copy url button clicked");

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="flex items-center space-x-4">
      <p>{url}</p>
      <Button variant="outline" size="icon" onClick={copyToClipboard}>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CopyUrl;
