import {YeomanGenerator} from "../../../YeomanGenerator";
import jscodeshift, {
  identifier, 
  stringLiteral, 
  ImportDeclaration, 
  ImportSpecifier, 
  importDeclaration,
  importSpecifier,
  Collection,
} from "jscodeshift";
import path from "path";

// @deprecated - The code is not used. We keep it as the example of working with the jscodeshift library
export function addAddonImport(
  gen: YeomanGenerator,
  dirShift: string,
  addonPackageName: string
) {
  const addonsAst = getAddonsAST(gen, dirShift);
  if(addonsAst === null) {
    gen.log('Unable to add addons import: addons.ts file not found');
    return;
  }

  if (isAddonAlreadyImported(addonsAst, addonPackageName)) {
    gen.log(`addon ${addonPackageName} is already imported`);
    return;
  }

  injectAddonImport(gen, dirShift, addonsAst, addonPackageName);
}

// @deprecated - The code is not used. We keep it as the example of working with the jscodeshift library
export function addAddonPalette(
  gen: YeomanGenerator,
  dirShift: string,
  paletteComponentName: string,
  addonPackageName: string 
) {
  const appPalettePath = getPalettePath(gen, dirShift);
  if (!gen.fs.exists(appPalettePath)) {
    gen.log(`Unable to add addon's palette to app palette: app palette not found`);
    return;
  }

  const appPaletteContents = gen.fs.read(appPalettePath);

  const updatedAppPaletteContentns = injectAddonPalette(appPaletteContents, addonPackageName, paletteComponentName);
  gen.fs.write(appPalettePath, updatedAppPaletteContentns);
}

// @deprecated - The code is not used. We keep it as the example of working with the jscodeshift library
export function removeAddonImport (
  gen: YeomanGenerator,
  dirShift: string,
  addonPackageName: string
) {
  const addonsAst = getAddonsAST(gen, dirShift);
  if(addonsAst === null) {
    gen.log(`Unable to remove ${addonPackageName} addon from addons.ts: addons.ts file not found`);
    return;
  }
  const addonImport = addonsAst
    .find(ImportDeclaration)
    .filter((path) => {
      return path.value.source.value === addonPackageName;
    });
  
  if(addonImport.length === 0) {
    gen.log(`Unable to remove ${addonPackageName} addon from addons.ts: addons.ts doesn't contain this import`);
    return;
  }

  addonImport.remove();
  gen.fs.write(getAddonsPath(gen, dirShift), addonImport.toSource());
}

// @deprecated - The code is not used. We keep it as the example of working with the jscodeshift library
export function removeAddonsPalette (
  gen: YeomanGenerator,
  dirShift: string,
  addonPackageName: string
) {
  const paletteAst = getPaletteAST(gen, dirShift);
  if(paletteAst === null) {
    gen.log(`Unable to remove ${addonPackageName} palette from palette.ts: palette.ts file not found`);
    return;
  }

  const addonPaletteModulePath = `${addonPackageName}/palette`;

  const addonImport = paletteAst
    .find(ImportDeclaration)
    .filter((path) => {
      return path.value.source.value === addonPaletteModulePath;
    });
  
  if(addonImport.length === 0) {
    gen.log(`Unable to remove ${addonPackageName} palette from palette.ts: palette.ts doesn't contain this import`);
    return;
  }

  
  const addonPaletteComponentName = addonImport
    .find(ImportSpecifier)
    .nodes()[0].imported.name;

  const addonComponentPaletteJsxNodes = paletteAst.findJSXElements(addonPaletteComponentName);

  addonImport.remove();
  addonComponentPaletteJsxNodes.remove();

  gen.fs.write(getPalettePath(gen, dirShift), addonImport.toSource());
}

function getAddonsAST(
  gen: YeomanGenerator,
  dirShift: string,
) : Collection<any> | null {
  const addonsPath = getAddonsPath(gen, dirShift);
  if (!gen.fs.exists(addonsPath)) {
    return null;
  }
  
  const addonsContents = gen.fs.read(addonsPath);
  const tsxParser = jscodeshift.withParser('tsx');
  return tsxParser(addonsContents);
}

function injectAddonImport(
  gen: YeomanGenerator,
  dirShift: string,
  addonsAST: Collection<any>,
  addonPackageName: string
) {
  const transformedAddonsContent = transformAddonsContent(addonsAST.toSource(), addonPackageName);
  gen.fs.write(getAddonsPath(gen, dirShift), transformedAddonsContent);
}

function getAddonsPath(
  gen: YeomanGenerator,
  dirShift: string,
) {
  return path.join(
    gen.destinationRoot(),
    dirShift ?? '', 'core', 'addons', 'addons.ts'
  );
}

function transformAddonsContent(content: string, addonPackageName: string) {
  return `import '${addonPackageName}'; 
    ${content}`;
}

function isAddonAlreadyImported(ast: Collection<any>, addonPackageName: string): boolean {
  return ast
    .find(ImportDeclaration)
    .filter(path => path.node.source.value === addonPackageName)
    .length > 0
}

function getPalettePath(
  gen: YeomanGenerator,
  dirShift: string,
) {
  return path.join(
    gen.destinationRoot(), 
    dirShift ? dirShift : '',
    'dev',
    'palette.tsx'
  );
}

function getPaletteAST(
  gen: YeomanGenerator,
  dirShift: string,
) : Collection<any> | null {
  const palettePath = getPalettePath(gen, dirShift);
  if (!gen.fs.exists(palettePath)) {
    return null;
  }
  
  const paletteContents = gen.fs.read(palettePath);
  const tsxParser = jscodeshift.withParser('tsx');
  return tsxParser(paletteContents);
}

function injectAddonPalette(
  appPaletteContents: string,
  addonPackageName: string,
  paletteComponentName: string
) {
  const tsxParser = jscodeshift.withParser('tsx');
  const paletteAst = tsxParser(appPaletteContents);

  if (isPaletteAlreadyImported(paletteAst, paletteComponentName)) {
    return appPaletteContents;
  }

  injectPaletteImport(paletteAst, paletteComponentName, addonPackageName);
  injectPaletteComponent(paletteAst, paletteComponentName);

  return paletteAst.toSource();
}

function createAddonPaletteJSX(paletteComponentName: string) {
  return `<${paletteComponentName}/>`;
}

function isPaletteAlreadyImported(ast: Collection<any>, paletteComponentName: string): boolean {
  return ast.find(ImportDeclaration)
  .find(ImportSpecifier)
  .filter(path => path.node.imported.name === paletteComponentName)
  .length > 0;
}

function injectPaletteImport(ast: Collection<any>, paletteComponentName: string, addonPackageName: string) {
  const addonPaletteImport = importDeclaration(
    [importSpecifier(identifier(paletteComponentName))],
    stringLiteral(`${addonPackageName}/palette`)
  );

  ast.get().node.program.body.unshift(addonPaletteImport);
}

function injectPaletteComponent(ast: Collection<any>, paletteComponentName: string) {
  const paletteAddonJSX = createAddonPaletteJSX(paletteComponentName);

  const palette = ast.findJSXElements('Palette');
  const [{value: {children}}] = palette.paths();
  children?.push(stringLiteral(paletteAddonJSX));
}
