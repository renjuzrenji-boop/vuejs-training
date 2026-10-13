import { inject, provide, readonly, ref } from "vue";

const themeKey = Symbol("portal-theme");
const storageKey = "employee-portal-theme";

const themeOptions = Object.freeze([
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "high-contrast", label: "High contrast" }
]);

function readSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(storageKey);
    return themeOptions.some((option) => option.value === savedTheme) ? savedTheme : "light";
  } catch {
    return "light";
  }
}

export function provideTheme() {
  const theme = ref(readSavedTheme());
  const readonlyTheme = readonly(theme);
  const readonlyThemeOptions = readonly(themeOptions);

  function setTheme(nextTheme) {
    if (!themeOptions.some((option) => option.value === nextTheme)) {
      return;
    }

    theme.value = nextTheme;
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Keep the in-memory theme usable when browser storage is unavailable.
    }
  }

  const themeContext = {
    theme: readonlyTheme,
    themes: readonlyThemeOptions,
    setTheme
  };

  provide(themeKey, themeContext);
  return themeContext;
}

export function useTheme() {
  const themeContext = inject(themeKey);
  if (!themeContext) {
    throw new Error("useTheme() must be called inside a component with provideTheme().");
  }

  return themeContext;
}