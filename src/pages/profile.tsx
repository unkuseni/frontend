import React from "react";
import { useAppSelector } from "@/hooks";
import { Button } from "@/components/ui/button";
import { usePasswordUpdate } from "@/hooks/updatePass";
import { useLogout } from "@/hooks/logout";
import { useDeleteUser } from "@/hooks/register";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { logout } = useLogout();
  const {
    deleteUser,
    status: deleteStatus,
    error: deleteError,
  } = useDeleteUser();
  const {
    updateUserPassword,
    isLoading: isUpdatingPassword,
    error: passwordUpdateError,
  } = usePasswordUpdate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = () => {
    logout();
    // Redirect to home or login page
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      await deleteUser();
      // Redirect to home or login page if successful
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserPassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Account Type:</strong> {user.isGuest ? "Guest" : "Registered"}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Update Password</h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-2">
          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit" disabled={isUpdatingPassword}>
            {isUpdatingPassword ? "Updating..." : "Update Password"}
          </Button>
          {passwordUpdateError && (
            <p className="text-red-500">{passwordUpdateError}</p>
          )}
        </form>
      </div>

      <div className="space-y-2">
        <Button onClick={handleLogout}>Logout</Button>
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          disabled={deleteStatus === "loading"}
        >
          {deleteStatus === "loading" ? "Deleting..." : "Delete Account"}
        </Button>
        {deleteError && <p className="text-red-500">{deleteError}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
