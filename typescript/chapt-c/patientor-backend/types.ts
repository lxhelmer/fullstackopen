import { NewEntrySchema } from './utils'
import { z } from 'zod';

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string,
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}


export type NoSsnEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
