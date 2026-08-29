export function numberToWords(num: number | null | undefined): string {
  if (num === null || num === undefined || Number.isNaN(num)) return '-';
  if (num === 0) return 'Zero';

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertLessThanHundred = (n: number): string => {
    if (n < 10) return units[n];
    if (n >= 10 && n < 20) return teens[n - 10];
    const tenDigit = Math.floor(n / 10);
    const unitDigit = n % 10;
    return `${tens[tenDigit]}${unitDigit ? ' ' + units[unitDigit] : ''}`;
  };

  const convertNumber = (n: number): string => {
    const integerPart = Math.floor(n);
    const decimalPart = Math.round((n - integerPart) * 100);

    let words = '';
    if (integerPart >= 100) {
      const hundredDigit = Math.floor(integerPart / 100);
      const rest = integerPart % 100;
      words = `${units[hundredDigit]} Hundred${rest ? ' ' + convertLessThanHundred(rest) : ''}`;
    } else {
      words = convertLessThanHundred(integerPart);
    }

    if (decimalPart > 0) {
      words += ` Point ${convertLessThanHundred(decimalPart)}`;
    }

    return words || 'Zero';
  };

  return convertNumber(num);
}
