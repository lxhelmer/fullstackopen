import { useParams } from 'react-router-dom';
import { Patient } from './../types'

const PatientPage = ({ patients }: {patients: Patient[]}) => {
  const id = useParams().id
  const patient = patients.find(n => n.id === id)
  if (patient)
  {
    console.log(patient)
    return (
        <div>
          <h2>Patientor</h2>
          <div>
            name:{' ' + patient.name}
            <br/>
            date of birth:{' ' + patient.dateOfBirth}

          </div>
        </div>
      )
  }
}




export default PatientPage;
