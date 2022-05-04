import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import url from "postcss-url";

import path from "path";

import metablock from "./rollup-plugin-iitcplugin";

const buildPath = "dist";
const pluginsPath = "src";

let pluginsId = ["search-guid"];

export default pluginsId.map((p) => ({
  input: path.join(pluginsPath, p, "index.js"),
  external: ["unsafeWindow"],
  output: {
    format: "iife",
    name: "setup",
    file: path.join(buildPath, p + ".user.js"),
    globals: {
      unsafeWindow: "{ default: unsafeWindow }",
    },
  },
  plugins: [
    metablock({
      id: p,
      meta: require("./" + path.join(pluginsPath, p, "meta.json")),
      downloadRoot: "https://le-jeu.github.io/iitc-plugins/",
      //updateMeta: true,
      timestamp: true,
      noWrapper: false,
      buildName: "lejeu",
    }),
    resolve(),
    postcss({
      inject: false,
      plugins: [
        url({
          url: "inline",
        }),
      ],
    }),
    babel({ babelHelpers: "bundled", presets: ["@babel/preset-env"] }),
  ],
}));
