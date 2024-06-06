"use client"; 
import { Button } from "@/components/ui/button";

export default function Login() {
  const onClick = () => {
    console.log("Login button clicked");
  };

  return (
    <div>
      <Button onClick={onClick}>Login</Button>
    </div>
  );
}
