import {expect} from "chai";
import {removeDeps} from "./uninstallNpmDeps";

describe('removeDeps()', () => {
  it('removes specified dependencies', () => {
    removeDeps(packageJson, ['oidc-client-ts', 'react-oidc-context']);
    expect(packageJson.dependencies["oidc-client-ts"]).to.be.undefined;
    expect(packageJson.dependencies["react-oidc-context"]).to.be.undefined;
  });

  it('does not break when encountering missing dependencies', () => {
    removeDeps(packageJson, ['lib-that-does-not-exist-in-the-first-place']);
    expect((packageJson as any).dependencies["lib-that-does-not-exist-in-the-first-place"]).to.be.undefined;
  })
});

const packageJson = {
  "name": "jmix2-petclinic",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@amplicode/react": "file:../packages/react/amplicode-react-0.23.0.tgz",
    "@ant-design/icons": "^4.6.3",
    "@apollo/client": "~3.5.10",
    "@react-buddy/ide-toolbox": "^2.0.0",
    "@react-buddy/palette-antd": "^4.0.0",
    "@react-buddy/palette-react-intl": "^5.0.1",
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "@types/jest": "^27.0.24",
    "@types/node": "^12.20.20",
    "@types/react": "^17.0.19",
    "@types/react-dom": "^17.0.9",
    "@types/react-router-dom": "^5.1.9",
    "antd": "^4.21.0",
    "axios": "^0.21.1",
    "dayjs": "^1.11.0",
    "graphql": "^15.5.1",
    "mobx": "^6.3.2",
    "mobx-react": "^7.2.0",
    "oidc-client-ts": "^2.0.5",
    "qs": "^6.7.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-intl": "^5.20.10",
    "react-oidc-context": "^2.1.1",
    "react-router-dom": "^6.3.0",
    "typescript": "^4.3.5",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "generate": "graphql-codegen",
    "generate:watch": "graphql-codegen --watch",
    "test": "jest"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/preset-env": "^7.8.4",
    "@babel/preset-react": "^7.8.3",
    "@graphql-codegen/cli": "^2.2.0",
    "@graphql-codegen/gql-tag-operations-preset": "^1.2.3",
    "@graphql-codegen/typescript": "^2.2.2",
    "@types/qs": "^6.9.7",
    "@vitejs/plugin-react": "^1.0.7",
    "babel-jest": "^27.5.1",
    "eslint": "^7.32.0",
    "eslint-config-react-app": "^6.0.0",
    "jest": "^27.0.0",
    "jest-raw-loader": "^1.0.1",
    "prettier": "^2.4.1",
    "ts-jest": "^27.1.3",
    "typescript": "^4.4.4",
    "vite": "^2.7.2",
    "whatwg-fetch": "^3.6.2"
  },
  "amplicode": {
    "generatorVersion": "0.23.0"
  }
};