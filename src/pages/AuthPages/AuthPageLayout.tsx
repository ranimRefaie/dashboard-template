import React from "react";

import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";




export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-red-300">
      {/* Header */}
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
      <main className="flex-1 flex items-center justify-center py-8"> {/* هنا التعديل */}
        <section className="w-full max-w-md px-4">
          {children}
        </section>
      </main>

      {/* Theme Toggler */}
      <div className="fixed z-50 bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
