import {YeomanGenerator} from "../../../../YeomanGenerator";

export async function uninstallNpmDeps(gen: YeomanGenerator, deps: string[]) {
  const packageJsonPath = gen.destinationPath('./package.json');
  const packageJson = await gen.fs.readJSON(packageJsonPath);
  removeDeps(packageJson, deps);
  await gen.fs.writeJSON(packageJsonPath, packageJson);
  await gen.npmInstall();
}

export function removeDeps(packageJson: any, deps: string[]) {
  for (const dep of deps) {
    delete packageJson.dependencies[dep];
  }
}