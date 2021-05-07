const gen = require('./generate-client-scr');

const clientDir = 'example-react-app';
const answers = require('./model/example-react-app-answers.js');
const intIdentityIdCardsConfig = require('./screens/int-identity-id-cards.js');
const intIdentityIdManagementTableConfig = require('./screens/int-identity-id-management-table.js');
const intIdentityIdManagementCardsConfig = require('./screens/int-identity-id-management-cards.js');
const intIdentityIdManagementListConfig = require('./screens/int-identity-id-management-list.js');
const intIdManagementTableConfig = require('./screens/int-id-management-table.js');
const intIdManagementCardsConfig = require('./screens/int-id-management-cards.js');
const intIdManagementListConfig = require('./screens/int-id-management-list.js');
const stringIdCardsConfig = require('./screens/string-id-cards.js');
const stringIdManagementTableConfig = require('./screens/string-id-management-table.js');
const stringIdManagementCardsConfig = require('./screens/string-id-management-cards.js');
const stringIdManagementListConfig = require('./screens/string-id-management-list.js');
const weirdStringIdManagementTableConfig = require('./screens/weird-string-id-management-table.js');
const weirdStringIdManagementCardsConfig = require('./screens/weird-string-id-management-cards.js');
const weirdStringIdManagementListConfig = require('./screens/weird-string-id-management-list.js');
const boringStringIdManagementTableConfig = require('./screens/boring-string-id-management-table.js');
const trickyIdConfig = require('./screens/tricky-id-list.js');
const carCardsGridConfig = require('./screens/car-cards-grid.js');
const structureConfig = require('./screens/structure.js');
const dirShift = '../../';

gen(
    'React client SCR',
    clientDir,
    'scripts/model/projectModel-scr-jmix.json',
    [
      { command: 'react-typescript:app' },
      // Car Service Center domain entities
      {
        command: 'react-typescript:blank-component',
        dirShift,
        dest: 'src/app/blank-components',
        answers: answers.blankComponent
      },
      {
        command: 'react-typescript:structure',
        dirShift,
        dest: 'src/app/structure',
        answers: structureConfig,
      },
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/entity-cards',
        answers: answers.entityCards
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/entity-management',
        answers: answers.entityManagement
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/entity-management2',
        answers: answers.entityManagement2
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/entity-management3',
        answers: answers.entityManagement3
      },
      {
        command: 'react-typescript:entity-cards-grid',
        dirShift,
        dest: 'src/app/car-cards-grid',
        answers: carCardsGridConfig
      },
      // All datatypes
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/datatypes-test1',
        answers: answers.datatypesTest1
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/datatypes-test2',
        answers: answers.datatypesTest2
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/datatypes-test3',
        answers: answers.datatypesTest3
      },
      // Relations
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationO2O',
        answers: answers.associationO2O
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationO2M',
        answers: answers.associationO2M
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationM2O',
        answers: answers.associationM2O
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationM2M',
        answers: answers.associationM2M
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/compositionO2O',
        answers: answers.compositionO2O
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/compositionO2M',
        answers: answers.compositionO2M
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/datatypes2',
        answers: answers.datatypes2Test
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/datatypes3',
        answers: answers.datatypes3Test
      },
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/datatypes-test-cards',
        answers: answers.datatypesTestCards
      },
      // Integer ID
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/int-id-cards',
        answers: intIdentityIdCardsConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/int-id-management-table',
        answers: intIdManagementTableConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/int-id-management-cards',
        answers: intIdManagementCardsConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/int-id-management-list',
        answers: intIdManagementListConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/int-identity-id-management-table',
        answers: intIdentityIdManagementTableConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/int-identity-id-management-cards',
        answers: intIdentityIdManagementCardsConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/int-identity-id-management-list',
        answers: intIdentityIdManagementListConfig
      },
      // String ID
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/string-id-cards',
        answers: stringIdCardsConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/string-id-management-cards',
        answers: stringIdManagementCardsConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/string-id-management-list',
        answers: stringIdManagementListConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/string-id-management-table',
        answers: stringIdManagementTableConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/weird-string-id-management-cards',
        answers: weirdStringIdManagementCardsConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/weird-string-id-management-list',
        answers: weirdStringIdManagementListConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/weird-string-id-management-table',
        answers: weirdStringIdManagementTableConfig
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/boring-string-id-management-table',
        answers: boringStringIdManagementTableConfig
      },
      // Custom ID
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/tricky-id',
        answers: trickyIdConfig
      },

    ]
);
