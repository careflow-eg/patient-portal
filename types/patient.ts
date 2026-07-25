export interface Patient {
  id: string;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone_number?: string;
  blood_type?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  created_at: string;
}
