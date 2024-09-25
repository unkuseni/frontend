import React from "react";
import { useLogout } from "@/hooks/logout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({onClick}) => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/app"); // Redirect to home page after logout
  };

  return (
    <Button
      onClick={() => {
        handleLogout();
        onClick();
      }}
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogOut size={16} />
      Logout
    </Button>
  );
};

export default LogoutButton;
