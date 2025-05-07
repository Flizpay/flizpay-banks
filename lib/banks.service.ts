import BankFieldsSchema from "./schemas/bankFields.schema.json";
import BankSchema from "./schemas/banks.schema.json";
import type {
  Bank,
  BankFields,
  BankFieldsSchemaType,
  BankSchemaType,
} from "./types";

/**
 * Service to handle bank-related operations.
 * This service provides methods to retrieve bank information, including
 * bank fields and filtering banks based on various criteria.
 */
export class BanksService {
  // ************************************************************************
  // ********************** PUBLIC METHODS **********************************
  // ************************************************************************

  /**
   * Returns the fields of a bank in the specified language.
   * @param bankField The BankFieldsSchemaType to get the fields from.
   * @param language The language to get the fields in.
   * @returns The fields of the bank in the specified language.
   */
  public static getFieldByLanguage(
    bankField: BankFieldsSchemaType,
    language: string
  ) {
    const fields: Record<string, unknown> = {};
    if (bankField.userField1_en)
      fields.userField1 = bankField["userField1_" + language];
    if (bankField.userField2_en)
      fields.userField2 = bankField["userField2_" + language];
    if (bankField.userField3_en)
      fields.userField3 = bankField["userField3_" + language];
    if (bankField.userField4_en)
      fields.userField4 = bankField["userField4_" + language];
    if (bankField.password_en)
      fields.password = bankField["password_" + language];

    return fields as Omit<BankFields, "total">;
  }

  /**
   *  Return all banks or filter them by name, group, or top banks.
   * @param topBanks Flag to filter only top banks.
   * @param bankName Query string to filter banks by name.
   * @param bankGroup Query string to filter banks by group.
   * @returns An array of banks that match the specified criteria.
   */
  public static getBanks(
    topBanks?: boolean,
    bankName?: string,
    bankGroup?: string
  ): Bank[] {
    return BankSchema.filter((bank) => {
      if (topBanks && !bank.isTop) {
        return false;
      }

      if (
        bankName &&
        !bank.name.toLowerCase().includes(bankName.toLowerCase())
      ) {
        return false;
      }

      if (
        (bankGroup && !bank.group) ||
        (bankGroup &&
          bank.group &&
          bank.group.toLowerCase() !== bankGroup.toLowerCase())
      ) {
        return false;
      }

      // If we reach here, the bank has passed all specified filters
      return true;
    }).map((bank) => this.serializeBank(bank as BankSchemaType));
  }

  /**
   * Returns a bank by its ID.
   * @param bankId The ID of the bank to get.
   * @returns The bank with the specified ID, or undefined if not found.
   */
  public static getBank(bankId: string): Bank | undefined {
    const bankSchema = BankSchema.find(
      (bank) => this.getId(bank as BankSchemaType) === bankId
    );

    if (!bankSchema) return;

    return this.serializeBank(bankSchema as BankSchemaType);
  }

  /**
   * Returns the fields of a bank by its ID and language.
   * @param bankId  The ID of the bank to get the fields for.
   * @param language The language to get the fields in.
   * @returns The fields of the bank in the specified language, or undefined if not found.
   */
  public static getBankFields = (
    bankId: string,
    language: string
  ): BankFields | undefined => {
    const fields = BankFieldsSchema.find(
      (bankField) => this.getBankId(bankField) === bankId
    );

    if (fields) {
      const translatedFields = this.getFieldByLanguage(fields, language);
      return {
        total: fields.total,
        ...translatedFields,
      };
    }
  };

  // ************************************************************************

  // ************************************************************************
  // ************************** HELPER METHODS *****************************
  // ************************************************************************
  /**
   * Returns the ID of a bank or bank field object.
   * @param object The BankSchemaType or BankFieldsSchemaType to get the ID from.
   * @returns The ID of the object.
   */
  public static getId(object: BankSchemaType | BankFieldsSchemaType): string {
    return object._id.$oid;
  }

  /**
   * Returns the bank ID from a BankFieldsSchemaType object.
   * @param object The BankFieldsSchemaType to get the bank ID from.
   * @returns
   */
  public static getBankId(object: BankFieldsSchemaType): string {
    return object.bankId.$oid;
  }

  /**
   * Serializes a bank object to the Bank type.
   * @param bank The BankSchemaType to serialize.
   * @returns The serialized Bank object.
   */
  public static serializeBank(bank: BankSchemaType): Bank {
    return {
      _id: this.getId(bank),
      logoUrl: bank.logoUrl,
      name: bank.name,
      yaxiId: bank.yaxiId as string,
      group: bank.group,
      isTop: bank.isTop,
      tag: bank.tag,
      yaxiName: bank.yaxiName,
      isInstant: bank.isInstant,
      turnInstantDate: bank.turnInstantDate,
    };
  }
}
