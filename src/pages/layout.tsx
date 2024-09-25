import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
