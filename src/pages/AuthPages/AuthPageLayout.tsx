
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";


 export default function AuthLayout(){
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 overflow-hidden ">     
      <header className="lg:hidden mt-4 px-4"> 
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
      {/* Theme Toggler */}
      <div className="fixed z-50 bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
