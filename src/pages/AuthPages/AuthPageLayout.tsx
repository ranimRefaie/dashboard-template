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
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Header with Logo (for mobile) */}
      <header className="lg:hidden py-4 px-4 flex-none">
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
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Form Section - مركز في جميع الشاشات */}
        <section className="flex-1 flex items-center justify-center p-4 lg:p-0">
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
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

