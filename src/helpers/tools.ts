import CryptoJS from 'crypto-js';

const CLAVE_SECRETA = process.env.SECRET_ENCRYPT ?? '';

export const generateToken = (num = 16) => {
  const caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    token += caracteres[index];
  }
  return token;
}

export const encrypt = (str: string): string => {
  return CryptoJS.AES.encrypt(str, CLAVE_SECRETA).toString();
};

export const decrypt = (str: string): string => {
  const bytes = CryptoJS.AES.decrypt(str, CLAVE_SECRETA);
  return bytes.toString(CryptoJS.enc.Utf8);
};