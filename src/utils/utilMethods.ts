import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_APP_CRYPTO_SECRET_KEY;

// Data encryption
export const encryptData = (data: any): any => {
  if (data == null) return null;
  const stringData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
  return encrypted;
};

export const decryptData = <T = any>(ciphertext: string | null): T | null => {
  try {
    if (!ciphertext) return null;
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) return null;
    return JSON.parse(decryptedData) as T;
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
};

export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
};


