// export const registerCouple = async (data: {
//   partner1Name: string;
//   partner2Name: string;
//   phoneNumber: string;
//   email: string;
//   images: File[];
// }): Promise<void> => {
//   // Simulate an API delay
//   return new Promise((resolve) => {
//     console.log("API called with data:", data);
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });
// };

// // lib/api.ts
// export const getAllCouples = async () => {
//   const response = await fetch('/api/couples');
//   if (!response.ok) throw new Error('Failed to fetch couples');
//   return response.json();
// };

// export async function login(phone_number: string, code: string, partner__national_id?: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verify/`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ phone_number, code, partner__national_id }),
//   });

//   if (!res.ok) throw new Error("تأیید ناموفق بود");
//   return await res.json();
// }


const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function sendCode(phone_number: string) {
  const res = await fetch(`${API_BASE}/auth/send-code/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number }),
  });
  if (!res.ok) throw new Error("Failed to send code");
}

export async function verifyCode(phone_number: string, code: string, partner_id?: string) {
  const res = await fetch(`${API_BASE}/auth/verify/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number, code, partner_id }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Verification failed");
  return await res.json(); // { access, refresh, id }
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_BASE}/auth/profile/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load profile");
  return await res.json();
}



export async function registerCouple(formData: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/couples/register/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  //   headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "خطا در ثبت زوج");
  }

  return await res.json(); // { message: "ثبت موفق", id: ... }
}
