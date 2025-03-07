import patientData from '../data/patients';
import { PatientEntry, NoSensEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NoSensEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender, 
    occupation,
  }));
};

const addPatient = (entry : NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientData.filter(p => p.id === id)[0]
  return {...entry, entries:[]}
}

export default {
  getEntries,
  addPatient,
  findById
};

