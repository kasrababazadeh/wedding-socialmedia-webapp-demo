export interface Couple {
  id?: string;
  user_id?: string;
  name: string;
  story?: string;
  avatarUrl: string;
  likes?: number;
  slogan?: string;
  album?: string[];
  followers?: number;
  following?: number;
  weddingDate?: string;
  location?: string;
  qr_url?: string; 
  slug?: string;  
}

export interface Donation {
id: string;
donorName: string;
amount: number;
date: string;
coupleId: string;
message?: string;
}

