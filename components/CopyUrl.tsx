"use client";
import React from "react";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Copy } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface CopyUrlProps {
  url: string;
}

const CopyUrl: React.FC<CopyUrlProps> = ({ url }) => {
  const { toast } = useToast()
  
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          description: "Copied to clipboard",
        })
        
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="flex items-center space-x-4 border border-gray-300 m-auto rounded-md pl-2 max-w-xs sm:max-w-md">
      <span className="truncate overflow-hidden whitespace-nowrap">{url}</span>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="rounded-md"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end" alignOffset={6}>
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyUrl;
