import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitize = (text: string) => {
  console.log("hello")
}

export const isCharacterGSM = (text: string) => {
  // text = sanitize
  const gsmChars = /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!\"#¤%&'()*+,\-.\/:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\[~\]|\u20AC]*$/;

  return gsmChars.test(text);
}

export const charEncoding = (text: string) => {

  return isCharacterGSM(text) ? "GSM" : "UCS2"
}

