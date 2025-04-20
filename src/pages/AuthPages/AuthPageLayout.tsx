import React from "react";
// import GridShape from "../../components/common/GridShape";
// import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen bg-white dark:bg-red-400 overflow-hidden">
      {/* Header with Logo (for mobile) */}
      {/* <header className="lg:hidden mt-6 px-6">
        <Link to="/" className="block mx-auto w-fit">
          <img
            className="dark:hidden w-36"
            src="./images/logo/logo.svg"
            alt="Logo"
          />
          <img
            className="hidden dark:block w-36"
            src="./images/logo/logo-dark.svg"
            alt="Logo"
          />
        </Link>
      </header> */}

      {/* Main Content */}


      {/* Theme Toggler */}
      <div className="fixed z-50 bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
