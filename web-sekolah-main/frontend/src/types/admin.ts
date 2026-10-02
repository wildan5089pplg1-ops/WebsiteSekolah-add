export interface Course {
  id: number;
  judul: string;
  deskripsi: string;
  tipe: 'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir';
  link: string;
  biaya: 'Gratis' | 'Biaya tertera';
}

export interface Career {
  id: number;
  nama_pekerjaan: string;
  deskripsi: string;
  jurusan: 'PPLG' | 'TJKT' | 'DKV' | 'BCF' | string;
  link: string;
}

export interface Book {
  id: number;
  judul: string;
  pengarang: string;
  penerbit: string;
  tahun_terbit: string;
  kategori_1: string;
  isbn_issn: string;
}

export interface PpdbRegistration {
  id: number;
  registration_number: string;
  full_name: string;
  nisn: string;
  gender: 'L' | 'P';
  birth_place: string;
  birth_date: string;
  religion: string;
  previous_school: string;
  major: string;
  path: string;
  parent_name: string;
  phone: string;
  email: string | null;
  address: string;
}

export interface Contact {
  id: number;
  name: string;
  email_or_phone: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
}
