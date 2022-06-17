import { I18nStore } from "./I18nStore";

const initMessagesOne = {
  'initOne': 'initOne'
};
const initMessagesTwo = {
  'initTwo': 'initTwo'
};

const messagesOne = {'one': 'one'}
const overwrittenMessagesOne = {'one': 'overwrittenOne'}
const messagesTwo = {'two': 'two'};

const localeOne = 'localeOne';
const localeTwo = 'localeTwo';

describe("I18nStore", () => {
  it("merge messages works correctly", () => {
    const i18nStore = new I18nStore({
      [localeOne]: {caption: 'English', antdLocale: {locale: 'en'}, messages: initMessagesOne}
    }, localeOne);
    expect(i18nStore.currentMessages).toEqual(initMessagesOne);

    i18nStore.mergeMessages(localeOne, messagesOne);
    i18nStore.mergeMessages(localeOne, messagesTwo);
    expect(i18nStore.currentMessages).toEqual({
      ...initMessagesOne,
      ...messagesOne,
      ...messagesTwo,
    });

    i18nStore.mergeMessages(localeOne, overwrittenMessagesOne);
    expect(i18nStore.currentMessages).toEqual({
      ...initMessagesOne,
      ...messagesOne,
      ...overwrittenMessagesOne,
      ...messagesTwo,
    })
  });

  it("switching between locales works correctly", () => {
    const i18nStore = new I18nStore({
      [localeOne]: {caption: 'English', antdLocale: {locale: 'en'}, messages: initMessagesOne},
      [localeTwo]: {caption: 'English', antdLocale: {locale: 'en'}, messages: initMessagesTwo},
    }, localeOne);
    expect(i18nStore.currentLocale).toBe(localeOne);
    expect(i18nStore.currentMessages).toEqual(initMessagesOne);

    i18nStore.setCurrentLocale(localeTwo)
    expect(i18nStore.currentLocale).toBe(localeTwo);
    expect(i18nStore.currentMessages).toEqual(initMessagesTwo);
  });

  it('not existed locale works correctly', () => {
    const throwErrorWhileSettingNotExistedLocale = () => {
      const i18nStore = new I18nStore({
        [localeOne]: {caption: 'English', antdLocale: {locale: 'en'}}
      }, localeOne);
      i18nStore.setCurrentLocale('notExistedLocale');
    }
    const throwErrorWhileConstructingWithNotExistedLocale = () => {
      new I18nStore({
        [localeOne]: {caption: 'English', antdLocale: {locale: 'en'}}
      }, 'notExistedLocale');
    } 

    expect(throwErrorWhileSettingNotExistedLocale).toThrow('LocaleConfig should contain notExistedLocale locale');
    expect(throwErrorWhileConstructingWithNotExistedLocale).toThrow('LocaleConfigOptions should contain notExistedLocale defaultLocale');
  });
})