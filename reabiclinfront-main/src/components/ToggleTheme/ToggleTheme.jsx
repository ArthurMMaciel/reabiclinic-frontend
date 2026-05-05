import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const ToggleTheme = () => {
  const systemPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const pageClasses = document.documentElement.classList;

  useEffect(() => {
    systemPreference && pageClasses.add("dark");
  });
  const toggle = () => {
    pageClasses.toggle("dark");
  };
  return (
    <div className="sm:block mx-1">
      <MoonIcon
        className="size-6 text-gray-100 hidden cursor-pointer dark:block"
        onClick={toggle}
      />
      <SunIcon
        className="size-6 text-gray-100 block cursor-pointer dark:hidden"
        onClick={toggle}
      />
    </div>
  );
};

export default ToggleTheme;
