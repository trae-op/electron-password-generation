import crypto from "crypto";
import { promisify } from "node:util";
import { Injectable } from "../../@core/decorators/injectable.js";
import { TEncryptedVault } from "./types.js";
import { cryptoOptions } from "../../config.js";

// Промісифікуємо pbkdf2 для зручності використання з async/await
const pbkdf2 = promisify(crypto.pbkdf2);

@Injectable()
export class CryptoService {
  constructor() {}

  /**
   * Деривує криптографічний ключ з пароля користувача та солі за допомогою PBKDF2.
   * Ця функція є внутрішньою і використовується як для шифрування, так і для розшифрування.
   * @param userPassword Пароль, введений користувачем.
   * @param salt Buffer, що містить сіль.
   * @returns Promise<Buffer>, який повертає деривований ключ.
   */
  private async deriveKey(userPassword: string, salt: Buffer): Promise<Buffer> {
    return await pbkdf2(
      userPassword, // Пароль користувача
      salt, // Сіль
      cryptoOptions.PBKDF2_ITERATIONS, // Кількість ітерацій
      cryptoOptions.AES_KEY_LENGTH_BYTES, // Довжина потрібного ключа
      cryptoOptions.PBKDF2_DIGEST // Алгоритм хешування
    );
  }

  /**
   * Шифрує дані за допомогою пароля користувача.
   * Генерує унікальну сіль та IV для кожного шифрування.
   * @param value Дані, які потрібно зашифрувати (наприклад, рядок JSON з паролями).
   * @param userPassword Пароль, введений користувачем (головний пароль).
   * @returns Promise<EncryptedVault> з IV, сіллю та зашифрованими даними.
   */
  async encrypt(masterKey: string, key: string): Promise<TEncryptedVault> {
    // 1. Генеруємо унікальну випадкову сіль для деривації ключа
    const salt = crypto.randomBytes(cryptoOptions.SALT_LENGTH_BYTES);

    // 2. Деривуємо ключ з пароля користувача та щойно згенерованої солі
    const derivedKey = await this.deriveKey(key, salt);

    // 3. Генеруємо унікальний IV для шифрування AES
    const iv = crypto.randomBytes(16); // IV для AES-CBC завжди 16 байтів

    // 4. Створюємо шифратор та шифруємо дані
    const cipher = crypto.createCipheriv("aes-256-cbc", derivedKey, iv);
    const encryptedData = Buffer.concat([
      cipher.update(masterKey, "utf8"),
      cipher.final(),
    ]);

    // Повертаємо IV, сіль та зашифровані дані (всі у шістнадцятковому форматі)
    // Всі ці три значення (IV, сіль, encryptedData) потрібно зберігати разом.
    return {
      iv: iv.toString("hex"),
      salt: salt.toString("hex"),
      encryptedData: encryptedData.toString("hex"),
    };
  }

  /**
   * Розшифровує дані за допомогою пароля користувача, раніше збереженої солі та IV.
   * @param userPassword Пароль, введений користувачем (головний пароль).
   * @param encryptedVault Об'єкт, що містить сіль, IV та зашифровані дані.
   * @returns Promise<string> з розшифрованими даними.
   */
  async decrypt(key: string, encryptedVault: TEncryptedVault): Promise<string> {
    // 1. Конвертуємо сіль та IV з шістнадцяткового формату назад у Buffer
    const salt = Buffer.from(encryptedVault.salt, "hex");
    const iv = Buffer.from(encryptedVault.iv, "hex");
    const encryptedDataBuffer = Buffer.from(
      encryptedVault.encryptedData,
      "hex"
    );

    // 2. Деривуємо ключ з пароля користувача, використовуючи ТУ Ж САМУ сіль та параметри,
    // що використовувалися при шифруванні. Це КРИТИЧНО!
    const derivedKey = await this.deriveKey(key, salt);

    // 3. Створюємо дешифратор та розшифровуємо дані
    const decipher = crypto.createDecipheriv("aes-256-cbc", derivedKey, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedDataBuffer),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  }
}
