export interface AuthInformation {
  email: string;
  password: string;
  id?: number;
  countryCode?: string;
  languageCode?: string;
  twoFaCode?: string;
  destroySession?: boolean;
  message?: string;
}
