import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

/**
 * Type-aware linting, plus the few rules that encode this project's own
 * decisions rather than general good practice.
 *
 * `eslint-config-next` on its own only sees one file at a time, so it cannot
 * know that a promise is unawaited or that a condition is always true. The
 * type-checked configurations below read the same programme `tsc` does, which
 * is where most of the value is.
 */
const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // The codebase states its shapes with `type` throughout. Both are fine;
      // being consistent is the point, and the consistent one here is `type`.
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      // An unused argument named with a leading underscore is a deliberate
      // signature, not an oversight.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // `!` claims something the compiler cannot see. If it is true, a check
      // that says why is better; if it is wrong, it fails far from the cause.
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Every colour on this site lives in `app/globals.css`, so that the two
      // themes stay swappable from one place. `next/og` renders outside the
      // browser and cannot read a stylesheet, which is the one exception; it
      // is confined to `lib/og.ts` and declared below.
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/]",
          message:
            "Aucune couleur en dur hors de app/globals.css. Utiliser une variable de thème.",
        },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },

  {
    // The one place the palette is allowed to exist as literals, for the three
    // surfaces that render without a stylesheet: the social images, the
    // `theme-color` meta tags and the web app manifest.
    files: ["lib/palette.ts"],
    rules: { "no-restricted-syntax": "off" },
  },

  {
    // Configuration at the root: build tooling, not application code.
    files: ["*.mjs", "*.ts"],
    rules: { "no-console": "off" },
  },
]);

export default eslintConfig;
