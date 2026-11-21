import { describe, expect, it } from "vitest";
import { DEFAULT_WHITE_LABEL_THEME, themeReducer, type WhiteLabelTheme } from "./white-label-theme-editor";

describe("themeReducer", () => {
  it("updates the brand name and leaves other fields untouched", () => {
    const next = themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_BRAND_NAME", name: "Northwind" });
    expect(next.brandName).toBe("Northwind");
    expect(next.primaryColor).toBe(DEFAULT_WHITE_LABEL_THEME.primaryColor);
    expect(next.accentColor).toBe(DEFAULT_WHITE_LABEL_THEME.accentColor);
    expect(next.fontFamily).toBe(DEFAULT_WHITE_LABEL_THEME.fontFamily);
  });

  it("updates the primary color", () => {
    const next = themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_PRIMARY_COLOR", color: "#111827" });
    expect(next.primaryColor).toBe("#111827");
  });

  it("updates the accent color", () => {
    const next = themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_ACCENT_COLOR", color: "#22c55e" });
    expect(next.accentColor).toBe("#22c55e");
  });

  it("updates the font family", () => {
    const next = themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_FONT", font: "Poppins" });
    expect(next.fontFamily).toBe("Poppins");
  });

  it("sets and clears the logo url", () => {
    const withLogo = themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_LOGO", url: "blob:mock-url" });
    expect(withLogo.logoUrl).toBe("blob:mock-url");
    const cleared = themeReducer(withLogo, { type: "SET_LOGO", url: null });
    expect(cleared.logoUrl).toBeNull();
  });

  it("resets to a provided theme", () => {
    const customTheme: WhiteLabelTheme = {
      brandName: "Custom",
      primaryColor: "#000000",
      accentColor: "#ffffff",
      fontFamily: "Georgia",
      logoUrl: "blob:custom",
    };
    const changed = themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_BRAND_NAME", name: "Something else" });
    const reset = themeReducer(changed, { type: "RESET", theme: customTheme });
    expect(reset).toEqual(customTheme);
  });

  it("applies a sequence of edits correctly, reflecting the live-preview state", () => {
    let state = DEFAULT_WHITE_LABEL_THEME;
    state = themeReducer(state, { type: "SET_BRAND_NAME", name: "Vertex" });
    state = themeReducer(state, { type: "SET_PRIMARY_COLOR", color: "#2563eb" });
    state = themeReducer(state, { type: "SET_FONT", font: "Sora" });

    expect(state).toEqual({
      brandName: "Vertex",
      primaryColor: "#2563eb",
      accentColor: DEFAULT_WHITE_LABEL_THEME.accentColor,
      fontFamily: "Sora",
      logoUrl: null,
    });
  });

  it("does not mutate the input state", () => {
    const before = { ...DEFAULT_WHITE_LABEL_THEME };
    themeReducer(DEFAULT_WHITE_LABEL_THEME, { type: "SET_BRAND_NAME", name: "Mutated?" });
    expect(DEFAULT_WHITE_LABEL_THEME).toEqual(before);
  });
});
