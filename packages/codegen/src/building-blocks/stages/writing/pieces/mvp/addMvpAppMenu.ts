import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import j from "jscodeshift";
import {convertToUnixPath} from "../../../../../common/utils";
import { parseExpression } from "../jsCodeShift/parseExpression";

const tsxParser = j.withParser('tsx');

export interface AddAppMenuInput {
  gen: YeomanGenerator;
  dirShift: string;
  route: string;
  componentName: string;
  menuItemName?: string;
  pathToComponent?: string;
}

export function addMvpAppMenu({
  gen,
  dirShift,
  route,
  componentName,
  menuItemName,
  pathToComponent
}: AddAppMenuInput) {
  const destRoot = gen.destinationRoot();
  const srcDir = path.join(destRoot, dirShift ? dirShift : '');

  // Add menu item

  const appMenuPath = path.join(srcDir, 'app', 'menu', 'Menu.tsx');
  if (!gen.fs.exists(appMenuPath)) {
    gen.log('Unable to add component to menu: app menu not found');
    return;
  }
  const appMenuContents = gen.fs.read(appMenuPath);
  const appMenuTransformed = transformAddMenuItem(appMenuContents, route, componentName, menuItemName);
  gen.fs.write(appMenuPath, appMenuTransformed);
  gen.log(`✓ Menu item added for ${componentName}`);

  // Add route

  const routeConfigPath = path.join(srcDir, 'app', 'routes', 'AppRoutes.tsx');
  if (!gen.fs.exists(routeConfigPath)) {
    gen.log('Unable to add component: route config not found');
    return;
  }
  const routeConfigFileContent = gen.fs.read(routeConfigPath);
  let routeConfigTransformed;
  routeConfigTransformed = transformAddRouteItem(routeConfigFileContent, route, componentName);
  gen.log(`✓ Route item added for ${componentName}`);

  const componentPath = pathToComponent ?? `${getRelativePath(path.join(srcDir, 'app/routes'), destRoot)}/${componentName}`;
  routeConfigTransformed = transformAddRouteImport(routeConfigTransformed, componentName, componentPath);
  gen.fs.write(routeConfigPath, routeConfigTransformed);
  gen.log(`✓ Route import for ${componentName}`);
}

export function transformAddMenuItem(source: string, route: string, componentName: string, menuItemName?: string): string {
  const appMenuAST = tsxParser(source);

  const menu = appMenuAST
    .findVariableDeclarators('menuItems')
    .find(j.ArrayExpression);
  const [{value: {elements}}] = menu.paths();
  const newMenuItem = generateMenuItemAst(route, componentName, menuItemName);
  elements.push(newMenuItem);

  return appMenuAST.toSource();
}

export function transformAddRouteImport(
  source: string, 
  componentName: string, 
  componentPath: string, 
  isDefault: boolean = false): string
{
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

export function transformAddRouteItem(
  source: string, route: string, componentName: string
): string {
  const routeConfigAST = tsxParser(source);

  const menu = routeConfigAST.findJSXElements('Routes');
  const [{value: {children}}] = menu.paths();
  const routeItemJSX = createRouteItemJSX(route, componentName);
  children?.push(j.stringLiteral(routeItemJSX));

  return routeConfigAST.toSource();
}

function generateMenuItemAst(route: string, componentName: string, menuItemName?: string) {
  const menuItem = `
    {
      label: (
        <Link to="${route}">
          <FormattedMessage id="screen.${menuItemName ?? componentName}" />
        </Link>
      ),
      key: "${route}"
    }
  `;

  return parseExpression(menuItem);
}

function createRouteItemJSX(route: string, componentName: string) {
  return `
    <Route path="${route}">
      <Route index element={<${componentName}/>} />
      <Route path=":recordId" element={<${componentName}/>} />
    </Route>
  `;
}

function getRelativePath(routingDir: string, destRoot: string) {
  return convertToUnixPath(path.relative(routingDir, destRoot));
}
