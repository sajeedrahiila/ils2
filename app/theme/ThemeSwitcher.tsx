import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2 items-center">
      <button
        className={`px-3 py-1 rounded ${theme === "light" ? "bg-yellow-200" : "bg-gray-200"}`}
        onClick={() => setTheme("light")}
      >Light</button>
      <button
        className={`px-3 py-1 rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
        onClick={() => setTheme("dark")}
      >Dark</button>
      <button
        className={`px-3 py-1 rounded border ${theme === "mushaf" ? "bg-amber-100 border-yellow-700" : "bg-gray-200"}`}
        onClick={() => setTheme("mushaf")}
      >Mushaf</button>
    </div>
  );
}
