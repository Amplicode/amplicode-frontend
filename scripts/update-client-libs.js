const {runCmdSync} = require('./common');

const dirNames = {
  'react-core': 'react-core',
  'react-antd': 'react-antd',
};

const updateClientLibs = async (clientDir, libs, updateCubaLibsOnly, packagesDir = '../packages') => {
  console.log('*** Updating client libs ***');

  for (const lib of libs) {
    console.log(`updating @amplicode/${lib}...`);
    const version = require(`${packagesDir}/${dirNames[lib]}/package.json`).version;
    cmd(clientDir, `npm install ${packagesDir}/${dirNames[lib]}/amplicode-${dirNames[lib]}-${version}.tgz --no-audit`);
    console.log(`@amplicode/${lib} updated`);
  }

  if (!updateCubaLibsOnly) {
    console.log(`updating other dependencies...`);
    cmd(clientDir, `npm install --no-audit`);
  }

  console.log(`all dependencies updated`);
};

const cmd = (cwd, command) => {
  console.log(`${cwd}$ ${command}`);
  runCmdSync(command, cwd);
};

module.exports = updateClientLibs;