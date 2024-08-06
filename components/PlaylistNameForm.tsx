import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlaylistNameFormProps {
  onSubmit: (name: string) => void;
  defaultName: string;
}

const PlaylistNameForm: React.FC<PlaylistNameFormProps> = ({ onSubmit, defaultName }) => {
  const [name, setName] = useState(defaultName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter playlist name"
      />
      <div className="flex justify-end">
        <Button type="submit">Create Playlist</Button>
      </div>
    </form>
  );
};

export default PlaylistNameForm;