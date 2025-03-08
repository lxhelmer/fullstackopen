import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Patient, Entry } from './../types'
import patientService from "../services/patients";

const DCodeComp = ({d_code}: {d_code: string}) => {
  return (
    <>
      <br/>
      {d_code}
    </>
  )
}


const EntryComp = ({entry}: {entry: Entry}) => {
  return (
    <>
    {entry.date}{' '}
    {entry.description}
    <br/>
    <br/>
    {entry.diagnosisCodes ? entry.diagnosisCodes.map(d => <DCodeComp d_code={d} key={d}/> ) : null}
    </>
  )
}



const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    const getpatient = async ({id}: {id: string}) => {
      const patient = await patientService.getById({id: id})
      setPatient(patient);
    };
    if (id) {
      void getpatient({id: id})
    }
  }, []);

  if (patient)
  {
    return (
        <div>
          <h2>Patientor</h2>
          <div>
            <br/>
            <br/>
            <h3>
            Entries:
            </h3>
            {patient.entries.map(e => <EntryComp entry={e} key={e.description}/>)}
          </div>
        </div>
      )
  }
  return null
}




export default PatientPage;
