import {makeObservable, action, observable, computed, autorun} from "mobx";

export type LocaleDirection = 'rtl' | 'ltr';

export interface LocaleConfigOption {
  caption: string;
  direction?: LocaleDirection;
  antdLocale?: { locale: string; };
  messages?: Record<string, string>;
}

export interface LocaleConfig extends LocaleConfigOption {
  messages: Record<string, string>;
  direction: LocaleDirection;
}

export class I18nStore {
  static LOCALE_STORAGE_KEY = 'amplicodeLocale';

  localeConfigs: { [locale: string]: LocaleConfig } = {};
  currentLocale: string;

  private storage: Storage;

  constructor(localeConfigOptions: Record<string, LocaleConfigOption>, defaultLocale: string) {
    this.setLocaleConfigs(localeConfigOptions);
    
    if (!Object.keys(localeConfigOptions).includes(defaultLocale)) {
      throw new Error(`LocaleConfigOptions should contain ${defaultLocale} defaultLocale`)
    }
    this.storage = window.localStorage;
    this.currentLocale = this.storage.getItem(I18nStore.LOCALE_STORAGE_KEY) ?? defaultLocale;
    
    makeObservable<I18nStore>(this, {
      localeConfigs: observable,
      currentLocale: observable,
      mergeMessages: action,
      setCurrentLocale: action,
      currentMessages: computed,
    });

    autorun(() => {
      if (this.currentLocale != null) {
        this.storage.setItem(I18nStore.LOCALE_STORAGE_KEY, this.currentLocale)
      } else {
        this.storage.removeItem(I18nStore.LOCALE_STORAGE_KEY)
      }
    })
  }

  private setLocaleConfigs(localeConfigOptions: Record<string, LocaleConfigOption>) {
    this.localeConfigs = Object.entries(localeConfigOptions)
      .reduce<Record<string, LocaleConfig>>((newLocalesInfo, [locale, localeConfigOption]) => {
        newLocalesInfo[locale] = {
          ...localeConfigOption,
          messages: localeConfigOption.messages ?? {},
          direction: localeConfigOption.direction ?? 'ltr',
        };
        return newLocalesInfo;
      }, {});
  }

  mergeMessages = (locale: string, messages: Record<string, string>) => {
    const localeInfo = this.localeConfigs[locale];
    if(localeInfo != null) {
      localeInfo.messages = {
        ...localeInfo.messages,
        ...messages
      }
    }
  }

  setCurrentLocale = (locale: string) => {
    if (!Object.keys(this.localeConfigs).includes(locale)) {
      throw new Error(`LocaleConfig should contain ${locale} locale`);
    }
    this.currentLocale = locale;
  }

  get currentMessages(): Readonly<Record<string, string>> {
    return this.localeConfigs[this.currentLocale].messages;
  }
}
