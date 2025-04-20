import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center lg:text-left mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Sign In
        </h1>
      </div>

      <form className="space-y-5">
        <div>
          <Label>
            Email <span className="text-error-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="info@gmail.com"
            className="w-full"
          />
        </div>

        <div>
          <Label>
            Password <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? (
                <EyeIcon className="size-5" />
              ) : (
                <EyeCloseIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isChecked}
              onChange={setIsChecked}
              id="remember-me"
            />
            <Label htmlFor="remember-me" className="!mb-0">
              Keep me logged in
            </Label>
          </div>
          <Link
            to="/reset-password"
            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="w-full" size="sm">
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}