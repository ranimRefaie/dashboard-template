import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header with Logo (for mobile) */}
      <header className="lg:hidden mt-6 px-6">
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
      </header>

      {/* Main Content */}
      <main className="flex flex-col justify-center  flex-1 lg:flex-row h-full">
        {/* Form Section */}
        <section className="flex flex-col justify-center  flex-1 p-6 lg:p-0">
          {children}
        </section>

        {/* Graphic Section (Desktop only) */}
        <section className="hidden lg:flex items-center justify-center w-1/2 bg-brand-950 dark:bg-white/5">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Theme Toggler */}
      <div className="fixed z-50 bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
