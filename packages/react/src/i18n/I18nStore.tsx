import {makeObservable, action, observable, computed, autorun} from "mobx";

export interface DayjsLocale {
  name: string
  weekdays?: string[]
  months?: string[]
  weekStart?: number
  weekdaysShort?: string[]
  monthsShort?: string[]
  weekdaysMin?: string[]
  ordinal?: (n: number) => number | string
  formats: Partial<{
    LT: string
    LTS: string
    L: string
    LL: string
    LLL: string
    LLLL: string
  }>
  relativeTime: Partial<{
    future: string
    past: string
    s: string
    m: string
    mm: string
    h: string
    hh: string
    d: string
    dd: string
    M: string
    MM: string
    y: string
    yy: string
  }>
}

export interface AntdLocale {
  locale: string;
  Pagination?: unknown;
  DatePicker?: unknown;
  TimePicker?: Record<string, unknown>;
  Calendar?: Record<string, unknown>;
  Table?: unknown;
  Modal?: unknown;
  Popconfirm?: unknown;
  Transfer?: Partial<unknown>;
  Select?: Record<string, unknown>;
  Upload?: unknown;
  Empty?: unknown;
  global?: Record<string, unknown>;
  PageHeader?: {
      back: string;
  };
  Icon?: Record<string, unknown>;
  Text?: {
      edit?: unknown;
      copy?: unknown;
      copied?: unknown;
      expand?: unknown;
  };
  Form?: {
      optional?: string;
      defaultValidateMessages: unknown;
  };
  Image?: {
      preview: string;
  };
}

export type LocaleDirection = 'rtl' | 'ltr';

export interface LocaleConfigOption {
  caption: string;
  direction?: LocaleDirection;
  antdLocale?: AntdLocale;
  dayjsLocale?: DayjsLocale;
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
