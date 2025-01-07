import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePatientStore = defineStore('patients', () => {
  const patients = ref([
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      address: '123 Main St, Anytown, USA',
      diagnosis: 'Diagnosis',
      protocol: 'Protocol',
      sessions: [
        { id: 1, date: '2025-01-01', details: 'Session 1 details' },
        { id: 2, date: '2025-01-08', details: 'Session 2 details' },
      ],
    },
  ])
  const patient = ref(null)

  const setPatient = (patientData) => {
    patient.value = patientData
  }

  const addPatient = (patient) => {
    patient.id = Date.now()
    patient.sessions = []
    patients.value.push(patient)
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
    patient.value = null
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
  }
})
