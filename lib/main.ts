import { BanksService } from "./banks.service";
import { TOP_BANK_ORDER } from "./top-bank-order";
import { BAD_VISIBILITY_LOGOS } from "./bad-visibility-logos";
import { NO_CREDENTIALS_BANKS } from "./no-credentials-banks";
import type {
  Bank,
  BankFields,
  BankFieldsSchemaType,
  BankSchemaType,
  BankTutorial,
} from "./types";
import deBankCredentialsTutorial from "./locales/de/bank-credentials-tutorial.json";
import enBankCredentialsTutorial from "./locales/en/bank-credentials-tutorial.json";

const BANK_CREDENTIALS_TUTORIAL = {
  de: deBankCredentialsTutorial,
  en: enBankCredentialsTutorial,
} as const satisfies Record<string, Record<string, BankTutorial>>;

export {
  BanksService,
  TOP_BANK_ORDER,
  BAD_VISIBILITY_LOGOS,
  NO_CREDENTIALS_BANKS,
  BANK_CREDENTIALS_TUTORIAL,
  type Bank,
  type BankFields,
  type BankFieldsSchemaType,
  type BankSchemaType,
};
