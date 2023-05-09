import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json" assert { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default [
  {
    input: "src/index.js",
    external,
    output: {
      name: "reactSimpleMaps",
      file: pkg.browser,
      format: "umd",
      extend: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "d3-geo": "d3",
        "d3-zoom": "d3",
        "d3-selection": "d3",
        "topojson-client": "topojson",
        "prop-types": "PropTypes",
      },
    },
    plugins: [
      babel({ babelHelpers: "bundled" }),
      commonjs(),
    ],
  },
  {
    input: "src/index.js",
    external,
    output: [
      {
        name: "reactSimpleMaps",
        file: pkg.main,
        format: "cjs",
      },
    ],
    plugins: [babel({ babelHelpers: "bundled" })],
  },
];
