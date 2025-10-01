//
// Ocean Professional theme tokens and simple utilities
//

export const theme = {
  // brand palette
  primary: "#2563EB",
  primaryLight: "#60A5FA",
  primaryDark: "#1E3A8A",

  secondary: "#F59E0B",
  secondaryLight: "#FCD34D",
  secondaryDark: "#B45309",

  error: "#EF4444",
  errorLight: "#FCA5A5",
  errorDark: "#B91C1C",

  background: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
  muted: "#6b7280",

  // alpha overlays
  alpha: {
    primary10: "rgba(37, 99, 235, 0.10)",
    primary15: "rgba(37, 99, 235, 0.15)",
    primary20: "rgba(37, 99, 235, 0.20)",
    secondary12: "rgba(245, 158, 11, 0.12)",
    error12: "rgba(239, 68, 68, 0.12)",
  },

  // gradients
  gradients: {
    headerAccent: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(249,250,251,0.9) 80%)",
    brandTile: "linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)",
    subtleCard: "linear-gradient(180deg, rgba(59,130,246,0.10) 0%, #f9fafb 70%)",
  },

  // focus ring
  ring: "0 0 0 3px rgba(37, 99, 235, 0.35)",

  // radii and shadows
  radius: {
    sm: 8,
    md: 10,
    lg: 12,
    full: 999,
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.12)",
  },
};

// PUBLIC_INTERFACE
export function focusRingStyle() {
  /** Returns a style object that applies the theme focus ring via boxShadow. */
  return {
    outline: "none",
    boxShadow: theme.ring,
    borderColor: theme.primary,
  };
}

// PUBLIC_INTERFACE
export function buttonVariants(variant = "primary") {
  /**
   * Returns style tokens for button variants:
   * - primary, ghost, danger
   */
  const base = {
    borderRadius: theme.radius.md,
    padding: "10px 14px",
    transition: "transform .1s ease, box-shadow .2s ease, background .2s ease, opacity .2s ease",
    boxShadow: theme.shadow.md,
  };

  if (variant === "primary") {
    return {
      ...base,
      background: theme.primary,
      color: "#fff",
      border: "none",
    };
  }
  if (variant === "ghost") {
    return {
      ...base,
      background: "transparent",
      color: theme.primary,
      border: `1px solid rgba(37, 99, 235, 0.35)`,
      boxShadow: theme.shadow.sm,
    };
  }
  if (variant === "danger") {
    return {
      ...base,
      background: theme.error,
      color: "#fff",
      border: "none",
    };
  }
  return base;
}

// PUBLIC_INTERFACE
export function badgeVariant(name) {
  /**
   * Returns a small badge style for tag/status chips using brand colors.
   * name: "low" | "medium" | "high" | "todo" | "progress" | "done"
   */
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "2px 8px",
    borderRadius: 999,
    fontSize: 12,
    border: "1px solid rgba(17,24,39,0.08)",
  };
  const m = {
    low: { background: "#ecfeff", color: "#0369a1", borderColor: "#a5f3fc" },
    medium: { background: "#fff7ed", color: "#a16207", borderColor: "#fcd34d" },
    high: { background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" },
    todo: { background: "#eef2ff", color: "#3730a3", borderColor: "#c7d2fe" },
    progress: { background: "#ecfeff", color: "#0e7490", borderColor: "#a5f3fc" },
    done: { background: "#ecfdf5", color: "#047857", borderColor: "#86efac" },
  };
  return { ...base, ...(m[name] || {}) };
}
