import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePatientStore = defineStore('patients', () => {
  const patients = ref([
    {
      id: Date.now().toString(),
      name: 'John Doe',
      age: 30,
      address: '123 Main St, Anytown, USA',
      diagnosis: 'Diagnosis',
      protocol: 'Protocol',
      specialist: 'Specialist name',
      date: '2025-01-01',
      bsa: '1.73',
      room: '101',
      gender: 'Male',
      caseSheetNumber: '1234567890',
      protocolName: 'Protocol Name',
      numberOfDoses: 2,
      drugs: [
        {
          id: Date.now().toString(),
          no: 'D1, 8, 15',
          name: 'Gemcitabine',
          dilutedIn: '500cc',
          routOfAdministration: 'Iv infusion',
          timeToStartAdministration: '',
          durationOfAdministration: '30 min',
          dose: '1000mg/m2',
          note: '',
        },
        {
          id: Date.now().toString(),
          no: '',
          name: 'Zofran',
          dilutedIn: 'Diluted in',
          routOfAdministration: 'Iv direct',
          timeToStartAdministration: '',
          durationOfAdministration: '50 min',
          dose: '8mg',
          note: '',
        },
      ],
    },
  ])
  const patient = ref({
    id: '',
    name: '',
    age: '',
    address: '',
    diagnosis: '',
    protocol: '',
    specialist: '',
    date: '',
    bsa: '',
    room: '',
    gender: '',
    caseSheetNumber: '',
    protocolName: '',
    numberOfDoses: '',
    drugs: [
      {
        id: Date.now().toString(),
        no: '',
        name: '',
        dilutedIn: '',
        routOfAdministration: '',
        timeToStartAdministration: '',
        durationOfAdministration: '',
        note: '',
        dose: '',
      },
    ],
  })
  const open = ref(false)

  const toggleOpen = () => {
    open.value = !open.value
  }

  const setPatient = (patientData) => {
    patient.value = patientData
  }

  const addPatient = (patientData) => {
    patientData.id = Date.now().toString()
    patientData.sessions = []
    patients.value.push(patientData)
  }

  const updatePatient = (id, updatedPatient) => {
    const index = patients.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...updatedPatient }
    }
  }

  const deletePatient = (id) => {
    patients.value = patients.value.filter((p) => p.id !== id)
  }

  const addSession = (patientId, session) => {
    const patient = patients.value.find((p) => p.id === patientId)
    if (patient) {
      patient.sessions.push({
        ...session,
        id: Date.now(),
        date: new Date().toISOString(),
      })
    }
  }

  const resetPatient = () => {
    patient.value = {
      id: '',
      name: '',
      age: '',
      address: '',
      diagnosis: '',
      protocol: '',
      specialist: '',
      date: '',
      bsa: '',
      room: '',
      gender: '',
      caseSheetNumber: '',
      protocolName: '',
      numberOfDoses: '',
      drugs: [
        {
          id: Date.now().toString(),
          no: '',
          name: '',
          dilutedIn: '',
          routOfAdministration: '',
          timeToStartAdministration: '',
          durationOfAdministration: '',
          note: '',
        },
      ],
    }
  }

  return {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    addSession,
    setPatient,
    patient,
    resetPatient,
    open,
    toggleOpen,
  }
})
