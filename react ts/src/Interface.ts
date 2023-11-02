export interface IStudent {
  _id: string;
  name: string;
  phoneNumber: number;
  gender: string;
  age: number;
  email: string;
  courses: string[];
}

export interface Icourse {
  _id: string;
  title: string;
  description: string;
  fees: number;
}
