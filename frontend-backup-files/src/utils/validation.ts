export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Simple example: allow digits, spaces, dashes, parentheses, + symbol
  const re = /^[\d\s\-()+]+$/;
  return re.test(phone);
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};
