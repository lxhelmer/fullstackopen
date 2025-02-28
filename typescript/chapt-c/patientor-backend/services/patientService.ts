import patientData from '../data/patients';
import { PatientEntry, NoSsnEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NoSsnEntry[] => {
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
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient
};

