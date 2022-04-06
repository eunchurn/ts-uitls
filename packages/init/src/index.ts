#! /usr/bin/env node
import shelljs from "shelljs";
import { execSync } from "child_process";
import fs from "fs";
import { eslint, eslintignore } from "./eslintConfig";
import { prettier } from "./prettierConfig";
import { vscode } from "./vscodeConfig";

async function main() {
  console.log("== 🎁 installing eunchurn TypeScript project");
  execSync("yarn add -D typescript ts-node ts-node-dev @types/node @eunchurn/eslint-config");
  const giResult = execSync("npx gitignore node");
  console.log(giResult.toString());

  const tscResult = execSync("yarn tsc --init --outDir dist");
  console.log(tscResult.toString());

  fs.writeFileSync(".eslintrc.js", eslint);
  fs.writeFileSync(".eslintignore", eslintignore);
  fs.writeFileSync(".prettierrc", JSON.stringify(prettier, null, 2));

  try {
    shelljs.exec("mkdir .vscode");
  } catch {
    console.log(".vscode already exist");
  }

  fs.writeFileSync(".vscode/settings.json", JSON.stringify(vscode, null, 2));
  return "done";
}

main().then(() => {
  console.log("== 🎉 eunchurn project setting done");
});
