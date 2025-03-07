import diagnosisData from '../data/diagnoses';
import { DiagnosisEntry } from '../types';

const getEntries = (): DiagnosisEntry[] => {
  return diagnosisData;
};

export default {
  getEntries
};
