import { Button } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const LaunchButton = ({ sx = {}, ...props }) => {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="contained"
      sx={{
        borderRadius: 4,
        padding: "8px 16px", // Adjust padding for less height
        display: "flex", // Use flex to align items
        alignItems: "center", // Center items vertically
        justifyContent: "space-between", // Space between text and icon
        color: "#fff", // White text color
        ...sx,
      }}
      {...props}
    >
      <SignOutButton signOutCallback={() => router.push("/sign-in")}>
        <p className="text-light-2" style={{ margin: 0 }}>
          Logout
        </p>
      </SignOutButton>
      <KeyboardArrowRightIcon />
    </Button>
  );
};

export default LaunchButton;
