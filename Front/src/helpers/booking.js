export function noSymbols(cadena) {
    var regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(cadena);
  }

export function validateNumber(numero) {
    var regex = /^\d{10}$/;
    return regex.test(numero);
  }

export function validateCardholderName(name) {
    const words = name.trim().split(' ');
    return words.length >= 2;
  }
  
export function validateCardNumber(number) {
    return number.length === 16 && !isNaN(number);
  }
  
export function validateExpirationDate(expirationDate) {
    const [monthStr, yearStr] = expirationDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10) + 2000; // Assuming the year is represented with only the last two digits, adding 2000 to get the full year
    const expiration = new Date(year, month - 1); // Month in JavaScript Date object is zero-based, so subtract 1
    const currentDate = new Date();
    return expiration > currentDate;
  }
  
  
export function validateCVC(cvc) {
    return cvc.length === 3 && !isNaN(cvc);
  }