"use client";

import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

interface ListViewToggleProps {
  isGridView: boolean;
  setIsGridView: (isGridView: boolean) => void;
}

export default function ListViewToggle({ isGridView, setIsGridView }: ListViewToggleProps) {
  return (
    <Button variant="outline" size="icon" onClick={() => setIsGridView(!isGridView)}>
      {isGridView ? (
        <Grid className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <List className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle view</span>
    </Button>
  );
}