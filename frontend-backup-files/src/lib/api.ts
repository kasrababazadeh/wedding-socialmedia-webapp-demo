export const registerCouple = async (data: {
  partner1Name: string;
  partner2Name: string;
  phoneNumber: string;
  email: string;
  images: File[];
}): Promise<void> => {
  // Simulate an API delay
  return new Promise((resolve) => {
    console.log("API called with data:", data);
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// lib/api.ts
export const getAllCouples = async () => {
  const response = await fetch('/api/couples');
  if (!response.ok) throw new Error('Failed to fetch couples');
  return response.json();
};
