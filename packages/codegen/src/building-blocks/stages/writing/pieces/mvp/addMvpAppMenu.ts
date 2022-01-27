import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import jscodeshift, {stringLiteral} from "jscodeshift";
import {convertToUnixPath} from "../../../../../common/utils";

const j = jscodeshift;

export interface AddAppMenuInput {
  gen: YeomanGenerator;
  dirShift: string;
  route: string;
  componentName: string;
  pathToComponent?: string;
}

export function addMvpAppMenu({
  gen,
  dirShift,
  route,
  componentName,
  pathToComponent
}: AddAppMenuInput) {

  const destRoot = gen.destinationRoot();
  const srcDir = path.join(destRoot, dirShift ? dirShift : '');
  const componentPath = pathToComponent ?? `${getRelativePath(path.join(srcDir, 'core/screen-api'), destRoot)}/${componentName}`;

  const appMenuPath = path.join(srcDir, 'app', 'menu', 'Menu.tsx');
  if (!gen.fs.exists(appMenuPath)) {
    gen.log('Unable to add component to menu: app menu not found');
    return;
  }
  const appMenuContents = gen.fs.read(appMenuPath);
  const appMenuTransformed = transformAddMenuItem(appMenuContents, route);
  gen.fs.write(appMenuPath, appMenuTransformed);

  const screenRegistryFilePath = path.join(srcDir, 'core', 'screen-api', 'screen-registry.ts');
  if (!gen.fs.exists(screenRegistryFilePath)) {
    gen.log('Unable to add component to menu: screen registry not found');
    return;
  }
  const screenRegistryFileContent = gen.fs.read(screenRegistryFilePath);
  let screenRegistryTransformed;
  screenRegistryTransformed = transformAddScreenItem(screenRegistryFileContent, route, componentName);
  screenRegistryTransformed = transformAddScreenImport(screenRegistryTransformed, componentName, componentPath);
  gen.fs.write(screenRegistryFilePath, screenRegistryTransformed);
}

function transformAddMenuItem(source: string, route: string): string {
  const menuItemJSX = createMenuItemJSX(route);

  const tsxParser = j.withParser('tsx');
  const appMenuAST = tsxParser(source);

  const addonsMenu = appMenuAST.findJSXElements("AddonsMenu");
  if(addonsMenu.length) {
    addonsMenu.insertBefore(stringLiteral(menuItemJSX));
    return addonsMenu.toSource();
  }

  const menu = appMenuAST.findJSXElements('Menu');
  const [{value: {children}}] = menu.paths();
  children?.push(stringLiteral(menuItemJSX));

  return appMenuAST.toSource();
}

export function transformAddScreenImport(
  source: string, 
  componentName: string, 
  componentPath: string, 
  isDefault: boolean = false): string
{
  const tsxParser = j.withParser('tsx');
  const ast = tsxParser(source);

  const existingSpecifiers = ast.find(j.ImportDeclaration)
    .find(j.ImportSpecifier)
    .filter(path => path.node.imported.name === componentName);
  const alreadyImported = existingSpecifiers.length > 0;

  if (alreadyImported) {
    return source;
  }

  const importSpecifier = isDefault ? j.importDefaultSpecifier : j.importSpecifier;
  const newImport = j.importDeclaration(
    [importSpecifier(j.identifier(componentName))],
    j.stringLiteral(componentPath)
  );

  ast.get().node.program.body.unshift(newImport);

  return ast.toSource();
}

export function transformAddScreenItem(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  source: string, route: string, componentName: string
): string {

  const tsParser = j.withParser('ts');
  const screenRegistryAST = tsParser(source);

  const content = screenRegistryAST.toSource();

  const registerScreen = `
    screenStore.registerScreen('${route}', {
      component: ${componentName},
      captionKey: 'screen.${componentName}'   
    });
  `;
  
  const updatedContent = `
    ${content} 
    ${registerScreen}
  `;
  
  return updatedContent;
}


function createMenuItemJSX(key: string) {
  return `
    <Menu.Item
      title={getCaption('${key}')}
      key='${key}'
    >
      {getCaption('${key}')}
    </Menu.Item>
  `;
}

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}
