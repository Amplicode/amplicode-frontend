# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.20.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.19.0...@amplicode/codegen@0.20.0) (2022-06-15)


### Features

* add JSX outline captions for Form.Item elements [#452](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/452) ([1479bae](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1479baed2f478441161fe54ef382224c777f460d))
* combine react-core and react-antd into single runtime lib ([6779f16](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6779f162a793c7604819a188f88dfec264120bd3))
* horizontal menu [#403](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/403) ([77a740e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/77a740e9ee25be016d719fd25a69efa4ef0caf57))





# [0.19.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.18.0...@amplicode/codegen@0.19.0) (2022-06-10)


### Bug Fixes

* generator creates non-compiling screen with autoFocus for EntityLookupField [#412](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/412) ([30441b5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/30441b51eb16fb738aa62aba3f6c2a85b523f97f))
* missing breadcrumbs [#405](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/405) ([32e7f6c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/32e7f6c6da0c6b5bec83a854c2229267e5246ce4))
* modal does not close until the deletion is finished [#417](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/417) ([7d26fdb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7d26fdb6e77b21abae0aa6c0e47353ebb5dfe9dd))
* table looks ugly when too many columns [#423](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/423) ([661c61c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/661c61c4e02061363862d1838f70c876e7ccca1e))


### Features

* [Bean Validation] Send selected locale to backend [#372](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/372) ([097d60a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/097d60af7ae9b692bea8367b5a4be0f1e52ee80d))
* add Amplicode logo to the header [#409](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/409) ([e2ab64a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e2ab64a624d68dac74f64b9af0f6cd449e03ad06))
* custom scalars - LocalTime should support three types of format [#385](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/385) ([24488ec](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/24488ec8e1a8b441a997a7243567f5458720be1f))
* menu: use code style recommended for antd 4.20+ [#393](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/393) ([dcfe27d](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/dcfe27df946892471ec681ab2848ee35fb8d21ea))
* remove hotkeys from app template [#357](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/357) ([db0ab06](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/db0ab06b9b5df348333ac04ee4375a2fe03b7d93))
* screen generation should fail if there is no ID attribute in query [#242](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/242) ([cfd44b7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/cfd44b7d3eebbb587671e03cb555a5b458bab25b))
* support composite GraphQL schema [#308](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/308) ([dec91fa](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/dec91fafae4915ff8d8f80214545964a8d240bd1))
* support IDs with name other than "id" [#242](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/242) ([6b64353](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6b64353cd02459bb32dc739867cbbf82e6e6c8f9))
* update schema generator ([f0cf5d1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f0cf5d1e1c8b8c5bbf0c5c2f0cb1e47584ea11db))


### BREAKING CHANGES

* Using menuItems as a Menu prop





# [0.18.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.17.1...@amplicode/codegen@0.18.0) (2022-05-23)


### Bug Fixes

* components using dayjs are not updated when changing locale [#322](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/322) ([fa9d5e3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/fa9d5e3ad52cb047b09133325d96fa1acffd82a0))
* exception generating Entity Details screen for graphql methods with not-null parameters [#167](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/167) ([b298879](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b298879c85ec46d90fe5e8111e0f5fc83da0be81))
* form validation message doesn't have a bottom margin [#348](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/348) ([2c8f32e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2c8f32e0be652d75ffd2c1c600d30c3a513dd2f0))
* generate nice looking captions for enum constants [#358](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/358) ([7532491](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7532491f1840dc3c9fc1131e689feed689f2818b))
* incorrect caption on read-only details screen [#314](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/314) ([92a2a98](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/92a2a98731751660af0004e82f34a5b35a53984e))
* login screen doesn't react well on "login failed" login result [#113](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/113) ([c958f0d](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c958f0d9b2998ac8e12f5bed208f29b9c7ccefe2))
* missing i18n messages ([d5126f1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d5126f11016b7717416ec68533f8202122e8656e))


### Features

* add example of addon 2.0. ([f27e1b1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f27e1b142e5edfa2600854f74b71d6102072b3ce))
* add means for Studio to detect Amplicode project and addons [#158](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/158) ([befcee1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/befcee13616b18519776ef98614e766695cd9b18))
* add React Buddy's antd and react-intl palettes as dependencies [#331](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/331) ([e79949a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e79949a4dc9253e4d06371b1a5dba168b3efd617))
* autofocus first field in the editor form [#269](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/269) ([f7ffbd4](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f7ffbd4ae455e457831298f6c989c8f04c70eab3))
* custom scalars - BigInteger, Long, BigDecimal [#230](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/230) ([6352e86](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6352e86f5d2c16c12fa3f2e5d52e2628cfc0f880))
* remove multi-tabs and simplify routing [#151](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/151) ([e80bb54](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e80bb5412ca20bfba260d4cbd8d89a64d590e5e0))
* support built-in scalars in CRUD screen templates [#230](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/230) ([c0807f5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c0807f5c4d991d1c721fd4e3953e91fe32acacf7))
* support custom date scalars [#374](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/374) ([98156ef](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/98156efe02ecbf1bc5049c0c04da45cc16e210c2))
* support graphQL query for templates with filters [#139](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/139) ([6c961ec](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6c961ec438df4d21ee5c3ea7edf44e4063e2b042))
* support nullable\notnull scalar versions [#378](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/378) ([13a8dd8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/13a8dd8a3271253e1de70820e0700e76d408d4cb))
* support number scalars which are generated from java primitive types [#377](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/377) ([51b4485](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/51b4485d0d57bd4458bb847555c68565599c5ceb))
* support url scalars [#375](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/375) ([56aa929](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/56aa929b6d213987b1c163830ab4c2fc1157769a))
* track 'loading' and 'error' statuses of mutations [#128](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/128) ([9594692](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/9594692149cb58265975ba6120994bc5a8cac666))
* track 'loading' and 'error' statuses of mutations [#128](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/128) ([51ee3c1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/51ee3c1a7d5813add9ffd5083bb09c08b927673c))


### BREAKING CHANGES

* Remove generators addon and remove-addon, remove AddonMenu api





## [0.17.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.17.0...@amplicode/codegen@0.17.1) (2022-04-18)


### Bug Fixes

* entity list contains extra items in Card [#323](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/323) ([bacd03f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/bacd03f0a721d033fdd893fa129c3472b97545ed))
* graphql typedefs should be updated after new screen is generated [#329](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/329) ([2a3d269](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2a3d2693acf2353b2213ea199ae6d708dd430c92))
* support boolean and number in ValueWithLabel ([3c37ef7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3c37ef7c031296ac8f855da30a9e3faf5590f275))


### Reverts

* Revert "chore: bump versions" ([eda0893](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/eda0893c0a44f8d64bd3aca01cde390f0521942c))





# [0.17.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.16.1...@amplicode/codegen@0.17.0) (2022-04-14)


### Features

* implement custom scalars support ([f2b39bb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2b39bbe2cf553a48ad4db698e82d53282b950f4))
* improve eslint config in generated app [#196](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/196) ([d199ae9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d199ae968cbdf0d4333710026a158fa0d85382c7))





## [0.16.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.16.0...@amplicode/codegen@0.16.1) (2022-04-14)


### Bug Fixes

* env.production file should not be gitignored [#318](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/318) ([546300b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/546300b7eef6543de233a84654c7ee53c6254f50))





# [0.16.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.15.0...@amplicode/codegen@0.16.0) (2022-04-13)


### Features

* ability to deselect row in table screen [#295](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/295) ([747133a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/747133af45fb3a1fe7741eaff15fb063e251f76c))
* automatic relogin on session [#228](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/228) ([67a9ae3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/67a9ae31df281620e9f6e04fc1c5b5926f935b5f))
* locale selector component [#229](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/229) ([f3a978b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f3a978b0b7b7f272c8b473e00274328db1cdbc27))





# [0.15.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.14.1...@amplicode/codegen@0.15.0) (2022-04-07)


### Bug Fixes

* aTTRIBUTES_ARRAY property type must contain relatedProperty [#294](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/294) ([aa01670](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/aa01670bd9f746bda054533a01301e13dbc814b7))


### Features

* support antd localisation [#246](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/246) ([970c410](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/970c4106b43346b308dfba051803665faf5ada71))
* support localisation for dayjs [#245](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/245) ([96e9458](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/96e9458e5409a878b8740893e60abbe10f8084ee))





## [0.14.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.14.0...@amplicode/codegen@0.14.1) (2022-04-05)


### Bug Fixes

* pet editor failed to submit if owner or type is not empty [#267](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/267) ([85c3bfc](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/85c3bfcdf8017c93ff32dcc88b914d620f6f8561))





# [0.14.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.13.2...@amplicode/codegen@0.14.0) (2022-04-05)


### Bug Fixes

* error when refreshing page with editor in "new entity" state [#102](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/102) ([6789248](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/67892482a676f6c46885c5019ac9bdd3a59e9987))
* relation properties are not displayed in table screen ([8deff05](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8deff05f089e6c9e3a70cdedad272aa5727a37f2))


### Features

* filters for browser templates [#139](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/139) ([e6ae907](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e6ae9078c457e86c638e1fc7de1cc940798fc41d))
* lookup screen template and generator [#268](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/268) ([df8445c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/df8445cd5243b0eb391153d72c7d9b42454a42fe))





## [0.13.2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.13.0...@amplicode/codegen@0.13.2) (2022-03-30)

**Note:** Version bump only for package @amplicode/codegen





## [0.13.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.13.0...@amplicode/codegen@0.13.1) (2022-03-28)

**Note:** Version bump only for package @amplicode/codegen





# [0.13.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.12.0...@amplicode/codegen@0.13.0) (2022-03-23)


### Bug Fixes

* read only list should not have action buttons [#207](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/207) ([671259a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/671259a538f3e847a9770ad82719b1df48533235))


### Features

* i18nStore api [#127](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/127) ([64d21ea](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/64d21ea073e594f3477a96d8858cdb74de50e1bc))





# [0.12.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.11.0...@amplicode/codegen@0.12.0) (2022-03-21)


### Bug Fixes

* can't install npm packages after generating app template [#226](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/226) ([7280ba4](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7280ba4f78e5ca032fe0417f5c57293499cda1e9))
* peer dependency conflicts [#238](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/238) ([1973ed8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1973ed8fa8fd1a5cc986130179a8c142e5c46014))
* read only list should not have action buttons [#207](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/207) ([ad94173](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/ad941739bd1275d44c31f11b5f10e75da98077f3))


### Features

* add entity collection screen type 'Table' [#143](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/143) ([9d92aa2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/9d92aa2d5e88e2752d165a64408f211a4e3b5667))





# [0.11.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.10.0...@amplicode/codegen@0.11.0) (2022-03-14)


### Features

* add entity list type "list" [#142](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/142) ([35b0e51](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/35b0e515d01f7da4dd90085870abc5b0f7474346))
* migrate template from CRA to vite [#154](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/154) ([2badefb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2badefb35958e4b577cc1886c43d6de412841102))
* update react-buddy dependencies and template [#197](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/197) ([f7f8bbc](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f7f8bbc99d6bdae94136dc2c20d01bf859fbcae4))





# [0.10.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.9.0...@amplicode/codegen@0.10.0) (2022-03-10)


### Bug Fixes

* error in console when refreshing editor (refactored crud templates) [#194](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/194) ([02159a8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/02159a8fbf1ae67c4b79efde83871b9ca5d56702))


### Features

* add route as a separate screen template parameter [#178](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/178) ([1570e43](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1570e4380ddfddb2c37e6c7d12e434542ec64987))
* allow custom processing of form data before submit ([19f0768](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/19f0768485aaed73c51f1589e7edba4d508b87fa))
* scaffold getXXXDisplayName functions for entities when creating screens [#153](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/153) ([7ef1007](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7ef1007a031d67a2f0113356449a8ac8174823ac))





# [0.9.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.9.0-next.0...@amplicode/codegen@0.9.0) (2022-03-04)


### Features

* add generated screens to preview [#98](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/98) ([1dc1726](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1dc172600a8df507121c80263ec2a26c7af293d0))
* restructure CRUD screens for better readbility [#162](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/162) ([6369582](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/636958233a7153227b766d63bfab995e7c99b5b4))





# [0.9.0-next.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.8.0...@amplicode/codegen@0.9.0-next.0) (2022-02-22)


### Bug Fixes

* input is shown instead of checkbox for boolean property in editor [#33](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/33) ([67e5278](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/67e52780d36a4a7b769044d3ae778c9f42c2af0a))
* replace backslah with slash in codegen.yml on Windows OS [#155](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/155) ([5516bcb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5516bcb16afd2786fddf3efa19c45f231c8f831f))


### Features

* login and password initialization in development mode [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([729d330](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/729d3301bcd8877408bcbbc17df96198630cc9b9))





# [0.8.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.7.0...@amplicode/codegen@0.8.0) (2022-02-04)


### Bug Fixes

* addon i18n doesn't work when using components from addon [#110](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/110) ([a442fa4](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a442fa44e4b793e2efc2c1235009739ffaa48d5b))
* dynamic caption on login screen [#91](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/91) ([5521e83](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5521e832585ce52656cbe2e63386a50d93ee376b))
* fix compilation error on Windows os [#105](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/105) ([0a2ce97](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0a2ce97b65940592777a5ab2adad20818bb63b38))
* invalid request when editor page is refreshed [#102](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/102) ([0cac26b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0cac26be7fcce59dbde1d36804de0d856a5b7880))
* show selected submenu correctly ([383b734](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/383b734e31ae7d2190c9240e785a48feb1291c4f))
* tS typings generated on Windows cause compilation error fix [#105](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/105) ([e9128dd](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e9128dd05678ab5b15fcb5ff71c3932574b066ed))


### Features

* implement initialization hook for React Buddy [#145](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/145) ([1a4d41b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1a4d41b8f6c875b2092acd8ab847481c2d543cfe))
* use network-only cache policy by default [#37](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/37) ([d6ad3a8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d6ad3a843f8727a392d2b6b328a249e7eb78e8d8))





# [0.7.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.6.2...@amplicode/codegen@0.7.0) (2022-01-11)


### Features

* enrich antd palette [#117](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/117) ([a8ab1de](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a8ab1de5a62775cfd49ca58f0cdea8450eaf1bc6))





## [0.6.3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.6.2...@amplicode/codegen@0.6.3) (2021-12-22)


### Bug Fixes

* addon i18n doesn't work when using components from addon [#110](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/110) ([a442fa4](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a442fa44e4b793e2efc2c1235009739ffaa48d5b))
* show selected submenu correctly ([383b734](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/383b734e31ae7d2190c9240e785a48feb1291c4f))





## [0.6.2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.6.1...@amplicode/codegen@0.6.2) (2021-12-14)


### Bug Fixes

* peer deps issue when doing npm install in generated project ([4898bc3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4898bc312320849cc7e40993843bd4e761fe4d76))





## [0.6.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.6.0...@amplicode/codegen@0.6.1) (2021-12-14)


### Reverts

* add possibility to choose graphql api for getting i18n messages [#9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/9) ([74aa7b2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/74aa7b27b8ee739e5bfeed583f2ab2291c6eaf91))





# [0.6.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.5.3...@amplicode/codegen@0.6.0) (2021-12-09)


### Features

* add eventEmitter for screen-api ([f75f3a5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f75f3a579db4d37e0864da01cdee9c055088f4c1))
* add possibility to choose graphql api for getting i18n messages [#9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/9) ([0a9c426](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0a9c4269e336872e90b7592fab5d4cbd545c8ef1))





## [0.5.3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.5.2...@amplicode/codegen@0.5.3) (2021-11-24)


### Bug Fixes

* generated app not starting when using npm 8 ([a7d18ed](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a7d18edf2213bb14ef9e587eab32b9c69d397cdd))





## [0.5.2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.5.1...@amplicode/codegen@0.5.2) (2021-11-24)


### Bug Fixes

* fix example-app apollo types error by changing version of apollo ([557a87c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/557a87cbfc2f0ba81f90d019038709ea9e2d8c60))





## [0.5.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.5.0...@amplicode/codegen@0.5.1) (2021-11-19)


### Bug Fixes

* codegen.yml contains absolute path to schema file rather than relative [#81](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/81) ([1075da2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1075da27b9025ab1d23d4c423cd7ea8ee5e93927))
* npm install fails in npm 6 [#80](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/80) ([049074e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/049074e394006ed151c830250f075d04ffb4de50))





# [0.5.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.4.0...@amplicode/codegen@0.5.0) (2021-11-17)


### Features

* add ability to configure same-origin policy [#73](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/73) ([03b5715](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/03b571507dec5a311d18e012f1e383ce4e52f209))





# [0.4.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.3.0...@amplicode/codegen@0.4.0) (2021-11-15)


### Bug Fixes

* types generation fails due to incorrect schema path [#76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/76) ([cdd3b41](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/cdd3b41616f71c7916f76df8cb6538eed54d4f01))


### Features

* add entity-management template ([6220616](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6220616dcf16ec2a404fffefb5cd5b04084849bf))
* add possibility to customize login/logout endpoints [#72](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/72) ([c0ce6ca](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c0ce6ca0fd91ebd738751fb23d56e6ae0d5ee889))
* show login screen when graphql server response 'unauthenticated' ([20ccbe3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/20ccbe36bf9c89653f71ec190232bb8254226996)), closes [#12](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/12)





# [0.3.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@amplicode/codegen@0.1.1...@amplicode/codegen@0.3.0) (2021-11-01)


### Bug Fixes

* add default for idField answer ([c010850](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c01085036e2a1c4d7424f6e127c51685434c1882))
* cannot create new entity when the list of entities is empty ([91d71ac](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/91d71ac589c1fd992027916d42fdeb41e2e94350))
* incorrect import ([a9f3110](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a9f311088600c254cb215c0c9d2c277925c8598a))
* issue with wrong imports in addon generator [#45](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/45) ([b8c88c8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b8c88c8fdc5e34cce4b455e84f0a06e0ff9f50e6))
* missing listQueryName question ([4393a1e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4393a1ecad5cadd8a592440639b3e84a34365f5b))


### Features

* add .env files to app template ([5320851](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/53208510c539788e20b04e45f5d1cff662bc0a7d))
* add hotkeys ([0c5a566](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0c5a5664264c4c96e7ce3d56196a0cc276bbb931))
* addon generator port [#10](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/10) ([84f3894](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/84f3894e05248c1aebd8a5509f408989627ede01))
* generate TS types based on GraphQL schema ([b19c929](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b19c929c7f07b3f67167fd2e4ee4c6075bf90928))
* graphql schema path option in app generator ([86b2172](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/86b2172cac93f7beedad28b6d91264bbf53663c5)), closes [#28](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/28)
* improvements for addon generation [#52](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/52) ([96f3ec9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/96f3ec9f334e71d55ca231802880cac15752f2c9))
* react buddy support ([b109262](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b1092626dfe96bd61346e74e9632aa28a4c9aa6c))
* support addon's palette injection to main palette [#58](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/58) ([d314dd6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d314dd6b399e6058dac0a1a0124a704ba806f828))





## 0.1.1 (2021-09-29)

**Note:** Version bump only for package @amplicode/codegen





# [1.1.0-next.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.1...@haulmont/jmix-front-generator@1.1.0-next.0) (2021-07-20)


### Bug Fixes

* componentPreview by default exact prop is true ([449e259](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/449e259caf99b8da8dfee943fde5a9a629f016be))


### Features

* app persistentEntity flag for entity to metadata ([26f42a2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/26f42a2c9806fd21fce4107ce584246560633589))





## [1.0.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0...@haulmont/jmix-front-generator@1.0.1) (2021-07-02)


### Bug Fixes

* aborting of adding editor component to menu when managment component is generated [#479](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/479) ([e8d72d7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e8d72d7215407f817d6dd646801be122c61c24aa))
* send filter with count query ([a258873](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a25887377d68c175bf0572ac64dd8ad53948ca9d))





# [1.0.0-next.25](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.24...@haulmont/jmix-front-generator@1.0.0-next.25) (2021-06-28)


### Features

* switchable tabbing modes [#452](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/452) ([f94ba51](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f94ba51072d9b170345c310d7f2f96ba589e8c79))





# [1.0.0-next.24](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.23...@haulmont/jmix-front-generator@1.0.0-next.24) (2021-06-23)


### Bug Fixes

* compilation of new project fails due to empty routing.ts [#448](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/448) ([0e56e96](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0e56e9624498c730fc4617075bd5ac55e99f5b7e))
* master-detail screen: incorrect route after pagination [#446](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/446) ([a8a8c33](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a8a8c336c5536a5d1b60f09c3638a86b2cae9406))
* message keys in tab and screen titles [#324](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/324) ([444eeb1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/444eeb11727af6d4568c9edff32f6848599a29bb))





# [1.0.0-next.23](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.22...@haulmont/jmix-front-generator@1.0.0-next.23) (2021-06-21)


### Bug Fixes

* make menu item non-required in all templates ([58bde69](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/58bde69a47c68f8598a5c776f234b6d8196983e2))
* support bean validation for child entities [#390](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/390) ([7029b9e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7029b9eda28c484ef4ed6289ca0025ecb3ad198c))
* typeError when opening any entity list screen in visual designer [#425](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/425) ([492b083](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/492b0835ce2cf4bd7fb9982a6d03bb461fb3422c))


### Features

* app horizontal menu ([3a2a4a2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3a2a4a2922966de36b48fbe02b2783a371087765))





# [1.0.0-next.22](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.21...@haulmont/jmix-front-generator@1.0.0-next.22) (2021-06-17)


### Features

* notifications and modals API [#300](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/300) ([b0dcf03](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b0dcf0336e478617d1a80aff5fcef627e5e2485c))





# [1.0.0-next.21](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.20...@haulmont/jmix-front-generator@1.0.0-next.21) (2021-06-12)


### Features

* master-detail template ([fd9e9d1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/fd9e9d1abfc18cd0432f78bb3449f7c101628877))





# [1.0.0-next.18](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.17...@haulmont/jmix-front-generator@1.0.0-next.18) (2021-06-07)


### Bug Fixes

* no error message when opening list/editor that doesn't exist [#319](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/319) ([6582715](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6582715ff0f390ed22cfa9e0b049571dbe0b55d1))


### Features

* aPI for menu item selection / sub menu item expand [#367](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/367) ([839fdc8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/839fdc8c9623f248f53bbcef8ae2e59fe0d27ba4))
* using AST in previews generation [#358](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/358) ([b771acb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b771acb1cededf8229e01e5e3e26d7e34adf3f57))





# [1.0.0-next.17](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.16...@haulmont/jmix-front-generator@1.0.0-next.17) (2021-06-03)


### Bug Fixes

* make menu item question non-required ([66a1336](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/66a13362897db79702d9bc951379786403511a10))


### Features

* adding MenuItem to SubMenuItem child by key [#333](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/333) ([4da3f03](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4da3f03e7145801657a5d801fc165cc7daaac668))
* support bean validation [#235](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/235) ([11efc72](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/11efc72b571f5a42ae78f1d332180dc76e7a7f36))





# [1.0.0-next.16](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.15...@haulmont/jmix-front-generator@1.0.0-next.16) (2021-06-02)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# [1.0.0-next.15](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.14...@haulmont/jmix-front-generator@1.0.0-next.15) (2021-05-31)


### Bug Fixes

* issues with menu after antd updating [#321](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/321) ([06520d9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/06520d9d2adf68327ebb5d464157b3dd78b36ce7))


### Code Refactoring

* use graphql to fetch permissions [#251](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/251) ([1ab4c39](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1ab4c395bd8ac6922f2e8c381d9020e66175572e))
* use graphql to fetch permissions [#251](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/251) ([cd7e7d7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/cd7e7d75bff8660c28fb6a77419a3f4e5df77fef))


### Features

* menuItem info [#328](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/328) ([703d119](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/703d1193ef7299d15c0544f4b5c2257e26820b9a))
* mock server [#216](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/216) ([6cd7145](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6cd7145fb99cbdbe4f8e687c78171b34f0e20139))
* support One-to-Many Compositions in entity editor [#304](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/304) ([f90ce85](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f90ce8563cd1ecdef691937c525dc15196cc283c))
* using title property to set MenuItem label [#325](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/325) ([49c06b2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/49c06b21ee973c48c396307ff142f7b36878f96e))


### Reverts

* "refactor: use graphql to fetch permissions [#251](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/251)" ([f248d5a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f248d5a2afdc5a580f66aa1a0dc0a707a1550018))


### BREAKING CHANGES

* apollo client shoud be passed to JmixAppProvider

(cherry picked from commit cd7e7d75bff8660c28fb6a77419a3f4e5df77fef)
* apollo client shoud be passed to JmixAppProvider





# [1.0.0-next.14](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.13...@haulmont/jmix-front-generator@1.0.0-next.14) (2021-05-25)


### Features

* icons in react-typescript templates [#313](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/313) ([b1b2d53](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b1b2d53d882bee9758d9d9786afa6f2670eb3637))





# [1.0.0-next.13](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.12...@haulmont/jmix-front-generator@1.0.0-next.13) (2021-05-21)


### Features

* menu components and declarative approach [#22](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/22) ([3b1dfc7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b1dfc7355350e336f82c2932801cb168f1d8640))
* support One-to-One Compositions in entity editor [#43](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/43) ([9dd2d7f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/9dd2d7f4807636e1630f7c7f1ff10c34326d5e56))





# [1.0.0-next.12](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.11...@haulmont/jmix-front-generator@1.0.0-next.12) (2021-05-10)


### Features

* basic components palette in react app template [#270](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/270) ([8246137](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8246137857ed98410166c46e2922c22f994fb8f6))
* filter trait attributes ([b00d30f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b00d30fb28c86111bdc22d31626a248d3c57ec5c))





# [1.0.0-next.5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.4...@haulmont/jmix-front-generator@1.0.0-next.5) (2021-04-28)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# [1.0.0-next.4](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.3...@haulmont/jmix-front-generator@1.0.0-next.4) (2021-04-28)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# [1.0.0-next.3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.2...@haulmont/jmix-front-generator@1.0.0-next.3) (2021-04-25)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# 1.0.0-next.2 (2021-04-22)


### Bug Fixes

* antd error message templates ([52349fd](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/52349fd844b99cbbe4d30d10f4d6646c60a95989))
* chinese translation placement ([e6723e3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e6723e3235d44dcd88a33a7a8421f1fb0e021d96))
* entity cards template does not handle non-updatable entities correctly ([8b0d2ce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8b0d2ce3b81a7d4072fecfb347a16ae0e3640b60))
* fix deps versions ([5b36a38](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5b36a38172ec6696646a05c08f8cc9213bb9614f))
* fixed installing issue with npm7 [#220](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/220) ([2e57566](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2e5756698dd49d42aa5ab524ce5de45e4fc87657))
* fixed issue with string id questions [#179](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/179) ([33f1afa](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/33f1afa3596abd0cb19321e480f3859b26772976))
* fixed issue with string id questions in entity-cards generator [#181](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/181) ([f368d32](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f368d32a213f4b6d559003a539b11797db077986))
* fixed issue with wrong execute directory on generate sdk stage [#197](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/197) ([11e1428](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/11e142843e8a0f02153c7f64e9b6465135c1199c))
* form success massage ([3f6f867](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3f6f8672bffc21076e8e9a1a128019f8ea96e029))
* loading data in list and card views ([3b496a8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b496a8f1d877be2e8d8e8afe3aaf9559a0f3988))
* messages in menu ([afcefe6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/afcefe68f490fe4943b834b77f89340a12c2df76))
* mobx mutate observables only inside actions ([891e403](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/891e403d0a4812fcf6f1f24dee1700d5deb1393c))
* unexpected token error when running tests in generated app ([6adec6f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6adec6fbf4a6dc20113dd9941425ef0eea32bc4d))
* update-model (add front-generator dependency) ([1360d76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360d769b710454d3c2f6ee26367997e528ace06))
* **React:** build error due to TS version mismatch with dependency ([82f8b2e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/82f8b2e1c142e3710c819dceb11c34e98982d340))


### chore

* update antd version to 4.12.3 ([2a3f431](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2a3f43160f4c13c9f72c465ef0093b3402e39b83))
* update mobx-react version to 7.1.0 [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([b7545cb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b7545cb36d32df4cb69ee44539553680d1349f6d))
* update React version to 17 ([3b0f8eb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b0f8eb1566f266096879171fcdcf5c8fe35903e))
* updated react-scripts 3 to @haulmont/react-scripts ([c639284](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c639284b09d9dc4e8fc4686be5027be05ddb35ce))


### Code Refactoring

* cuba to jmix renaming ([1fdc59c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1fdc59cf8c942a7ba57e3008da73f9a5a07fe5b2))
* updating MobX version to 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([735fcce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/735fcce61f845378092373be44602647bbb9d00f))


### Features

* add GraphQL-based entity-management template ([195191b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/195191bcdc9700b895e0a9d18de5042ac850d182))
* added support of editing and removing entities with composite keys ([28567fb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28567fb3f2bf3765f5b536df6f701eda1052a64d))
* entity cards grid template ([df9cf57](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/df9cf5747f3dfd4d690d2d389acc08a2b2bdcd14))
* implemented component previews supporting in front generator [#163](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/163) ([e97ffd5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e97ffd5557d755fe968e9494fc8175f21c1686e7))
* implemented new features: multi tabs, multi screens, routing ([6456a05](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6456a0523192c8ab1e08aff59c48b177354b5866))
* info message error handler ([0d10392](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0d103924b964250ebeb7f49739c16dd4b26b0289))
* replace metadata to project ([c9e65d0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c9e65d081b6bed8a22997c628f89d2662a83bdff))
* structure template ([2e2212b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2e2212bb01dfdc11ef7130e868f74799b0f00a15))
* support new file API [#121](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/121) ([973ba6e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/973ba6eb7f69974671d75e39143f8f052af64a12))
* switch to using Jmix OAuth module ([5946e07](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5946e07dbe477b395683d777e8c7ecd92556a2f0))
* updated react-scripth with implemented highlighting dev modes [#212](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/212) ([096b8ee](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/096b8ee4dce8e0ffa2c43c21f6e302d5c78171bc))


### Reverts

* graphql support ([002ee27](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/002ee27e7411e53ca6acde02352fa1b8bb665e09))
* revert: graphql support ([889c440](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/889c44021816f325c46f9ce6cf3b0d0fa462137b))


### Tests

* updating tests to support MobX 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([f2af4c6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2af4c6258e77917221e26b0c0ebdbe1a320aaf4))


### BREAKING CHANGES

* updated typescript version
* update mobx-react version to 7.1.0
* updating tests to support MobX 6
* updating MobX version to 6
* added support of editing and removing entities with composite keys
* update React version to 17
* updated react-scripts 3 to @haulmont/react-scripts
* CubaApp renamed to JmixRestConnection
* antd version was updated to 4.12.3
* react-intl version was updated to 5.3.0






# 0.9.0-beta.1 (2021-03-25)


### Bug Fixes

* antd error message templates ([52349fd](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/52349fd844b99cbbe4d30d10f4d6646c60a95989))
* chinese translation placement ([e6723e3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e6723e3235d44dcd88a33a7a8421f1fb0e021d96))
* entity cards template does not handle non-updatable entities correctly ([8b0d2ce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8b0d2ce3b81a7d4072fecfb347a16ae0e3640b60))
* fix deps versions ([5b36a38](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5b36a38172ec6696646a05c08f8cc9213bb9614f))
* form success massage ([3f6f867](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3f6f8672bffc21076e8e9a1a128019f8ea96e029))
* update-model (add front-generator dependency) ([1360d76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360d769b710454d3c2f6ee26367997e528ace06))
* **React:** build error due to TS version mismatch with dependency ([82f8b2e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/82f8b2e1c142e3710c819dceb11c34e98982d340))


### chore

* update antd version to 4.12.3 ([2a3f431](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2a3f43160f4c13c9f72c465ef0093b3402e39b83))
* update mobx-react version to 7.1.0 [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([b7545cb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b7545cb36d32df4cb69ee44539553680d1349f6d))
* update React version to 17 ([3b0f8eb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b0f8eb1566f266096879171fcdcf5c8fe35903e))
* updated react-scripts 3 to @haulmont/react-scripts ([c639284](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c639284b09d9dc4e8fc4686be5027be05ddb35ce))


### Code Refactoring

* cuba to jmix renaming ([1fdc59c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1fdc59cf8c942a7ba57e3008da73f9a5a07fe5b2))
* updating MobX version to 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([735fcce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/735fcce61f845378092373be44602647bbb9d00f))


### Features

* added support of editing and removing entities with composite keys ([28567fb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28567fb3f2bf3765f5b536df6f701eda1052a64d))
* info message error handler ([0d10392](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0d103924b964250ebeb7f49739c16dd4b26b0289))


### Reverts

* graphql support ([002ee27](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/002ee27e7411e53ca6acde02352fa1b8bb665e09))
* revert: graphql support ([889c440](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/889c44021816f325c46f9ce6cf3b0d0fa462137b))


### Tests

* updating tests to support MobX 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([f2af4c6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2af4c6258e77917221e26b0c0ebdbe1a320aaf4))


### BREAKING CHANGES

* update mobx-react version to 7.1.0
* updating tests to support MobX 6
* updating MobX version to 6
* added support of editing and removing entities with composite keys
* update React version to 17
* updated react-scripts 3 to @haulmont/react-scripts
* CubaApp renamed to JmixRestConnection
* antd version was updated to 4.12.3
* react-intl version was updated to 5.3.0






# [0.9.0-beta.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@0.3.0...@haulmont/jmix-front-generator@0.9.0-beta.0) (2021-03-23)


### Bug Fixes

* form success massage ([3f6f867](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3f6f8672bffc21076e8e9a1a128019f8ea96e029))


### chore

* update mobx-react version to 7.1.0 [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([b7545cb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b7545cb36d32df4cb69ee44539553680d1349f6d))
* update React version to 17 ([3b0f8eb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b0f8eb1566f266096879171fcdcf5c8fe35903e))
* updated react-scripts 3 to @haulmont/react-scripts ([c639284](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c639284b09d9dc4e8fc4686be5027be05ddb35ce))


### Code Refactoring

* updating MobX version to 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([735fcce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/735fcce61f845378092373be44602647bbb9d00f))


### Features

* added support of editing and removing entities with composite keys ([28567fb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28567fb3f2bf3765f5b536df6f701eda1052a64d))
* info message error handler ([0d10392](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0d103924b964250ebeb7f49739c16dd4b26b0289))


### Tests

* updating tests to support MobX 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([f2af4c6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2af4c6258e77917221e26b0c0ebdbe1a320aaf4))


### BREAKING CHANGES

* update mobx-react version to 7.1.0
* updating tests to support MobX 6
* updating MobX version to 6
* added support of editing and removing entities with composite keys
* update React version to 17
* updated react-scripts 3 to @haulmont/react-scripts





# [0.3.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@0.3.0-beta.2...@haulmont/jmix-front-generator@0.3.0) (2021-03-04)


### Bug Fixes

* entity cards template does not handle non-updatable entities correctly ([8b0d2ce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8b0d2ce3b81a7d4072fecfb347a16ae0e3640b60))
* update-model (add front-generator dependency) ([1360d76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360d769b710454d3c2f6ee26367997e528ace06))


### Reverts

* graphql support ([002ee27](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/002ee27e7411e53ca6acde02352fa1b8bb665e09))
* revert: graphql support ([889c440](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/889c44021816f325c46f9ce6cf3b0d0fa462137b))





# 0.2.0-dev.2 (2021-01-19)


### Bug Fixes

* fix deps versions ([5b36a38](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5b36a38172ec6696646a05c08f8cc9213bb9614f))
* **React:** build error due to TS version mismatch with dependency ([82f8b2e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/82f8b2e1c142e3710c819dceb11c34e98982d340))
