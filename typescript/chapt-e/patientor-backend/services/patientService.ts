import patientData from '../data/patients';
import { Patient, NoSensEntry, NewPatientEntry } from '../types';
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

const addPatient = (entry : NewPatientEntry): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.filter(p => p.id === id)[0] 
  return {...patient}
}

export default {
  getEntries,
  addPatient,
  findById
};

