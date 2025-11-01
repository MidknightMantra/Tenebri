/**
 * =========================================================
 *  🕯️ TENEBRI — ESLint Sentinel
 *  Version: 1.6.4
 *  Author: Midknight Mantra
 *  Description:
 *    In the shadowed crypt of code, ESLint stands vigilant —
 *    warding against chaos, forging order in the void's brave embrace.
 * =========================================================
 */

import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
];