<script setup>
import { usePatientStore } from '@/stores/patients'
import { useRoute } from 'vue-router'
import { Button } from './ui/button'
import { useVueToPrint } from 'vue-to-print'
import { ref } from 'vue'

const componentRef = ref()
const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: 'patient_protocol',
})
const route = useRoute()
const patientStore = usePatientStore()
const patient = patientStore.patients.find((patient) => patient.id === route.params.id)
console.log(patient)
</script>

<template>
  <div v-if="patient">
    <div class="flex justify-between mb-6">
      <h1 class="text-2xl font-bold mb-4">Patient Details</h1>
      <Button @click="handlePrint">Download PDF</Button>
    </div>
    <div id="pdf-content" class="border p-4" ref="componentRef">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold mb-2 underline">Diagnosis: {{ patient.diagnosis }}</h2>
          <h2 class="text-xl font-bold mb-2 underline">Patient Protocol: {{ patient.protocol }}</h2>
        </div>
        <h2 class="text-xl font-bold mb-2 underline text-center">
          Chemotherapy Re-constitution Request Form
        </h2>
        <table class="w-full border-2 border-black dark:border-white my-5">
          <tr>
            <th class="border border-black dark:border-white p-2 text-left" colspan="3">
              Patient Name: {{ patient.name }}
            </th>
            <th class="border border-black p-2 dark:border-white text-left" colspan="2">
              Age: {{ patient.age }} years
            </th>
            <th class="border border-black dark:border-white p-2 text-left" colspan="2">
              BSA: {{ patient.bsa }} M2
            </th>
          </tr>
          <tr>
            <th class="border border-black dark:border-white p-2 text-left" colspan="4">
              Specialist Name: {{ patient.specialist }}
            </th>

            <th class="border border-black dark:border-white p-2 text-left" colspan="3">
              Date: {{ patient.date }}
            </th>
          </tr>
          <tr>
            <th class="border border-black dark:border-white p-2 text-left" colspan="3">
              Diagnosis: {{ patient.diagnosis }}
            </th>
            <th class="border border-black dark:border-white p-2 text-left" colspan="2">
              Protocol Name: {{ patient.protocolName }}
            </th>
            <th class="border border-black dark:border-white p-2 text-left" colspan="2">
              Number of doses: {{ patient.numberOfDoses }}
            </th>
          </tr>
          <tr>
            <th class="border border-black dark:border-white p-2 text-left" colspan="3">
              Case Sheet Number: {{ patient.caseSheetNumber }}
            </th>
            <th class="border border-black dark:border-white p-2 text-left" colspan="2">
              Room Number: {{ patient.room }}
            </th>
            <th class="border border-black dark:border-white p-2 text-left" colspan="2">
              Gender: {{ patient.gender }}
            </th>
          </tr>
          <tr>
            <th class="border border-black dark:border-white p-2 text-left">No</th>
            <th class="border border-black dark:border-white p-2 text-left">Drug</th>
            <th class="border border-black dark:border-white p-2 text-left">Diluted in</th>
            <th class="border border-black dark:border-white p-2 text-left">
              Rout of administration
            </th>
            <th class="border border-black dark:border-white p-2 text-left">
              Time to start administration
            </th>
            <th class="border border-black dark:border-white p-2 text-left">
              Duration of administration
            </th>
            <th class="border border-black dark:border-white p-2 text-left">Note</th>
          </tr>
          <tr v-for="drug in patient.drugs" :key="drug.id">
            <td class="border border-black dark:border-white p-2 text-left">{{ drug.no }}</td>
            <td class="border border-black dark:border-white p-2 text-left">{{ drug.name }}</td>
            <td class="border border-black dark:border-white p-2 text-left">
              {{ drug.dilutedIn }}
            </td>
            <td class="border border-black dark:border-white p-2 text-left">
              {{ drug.routOfAdministration }}
            </td>
            <td class="border border-black dark:border-white p-2 text-left">
              {{ drug.timeToStartAdministration }}
            </td>
            <td class="border border-black dark:border-white p-2 text-left">
              {{ drug.durationOfAdministration }}
            </td>
            <td class="border border-black dark:border-white p-2 text-left">{{ drug.note }}</td>
          </tr>
        </table>
        <p>
          ✔ This should be signed first by the hematologist, then the pharmacist, then the
          Re-constituter, and finally by the nurse.
        </p>
        <p>
          ✔The nurse should compare this paper to what had been written in the case sheet, which
          should be 100% compatible.
        </p>
        <p>✔The premedication is not included, so the nurse should check the case sheet.</p>
        <div class="flex justify-evenly">
          <p>Hematologist signature</p>
          <p>Pharmacist signature</p>
          <p>Re-constituter signature</p>
          <p>Nurse signature</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center text-2xl font-bold">Patient not found</p>
  </div>
</template>
