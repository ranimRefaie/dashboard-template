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
    <div className="relative grid grid-rows-[auto_1fr_auto] min-h-[100dvh] bg-white dark:bg-gray-900">
      {/* Header with Logo (for mobile) */}
      <header className="lg:hidden h-[33.33vh] flex items-center justify-center px-4">
        <Link to="/" className="block">
          <img
            className="dark:hidden w-52 max-w-full"
            src="./images/logo/logo.svg"
            alt="Logo"
          />
          <img
            className="hidden dark:block w-40 max-w-full"
            src="./images/logo/logo-dark.svg"
            alt="Logo"
          />
        </Link>
      </header>
      

      {/* Main Content */}
      <main className="row-start-2 grid lg:grid-cols-2 h-full">
        {/* Form Section */}
        <section className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>

        {/* Graphic Section (Desktop only) */}
        <section className="hidden lg:flex items-center justify-center bg-brand-950 dark:bg-white/5">
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
      <div className="fixed z-50 bottom-6 right-6 row-start-3">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}

