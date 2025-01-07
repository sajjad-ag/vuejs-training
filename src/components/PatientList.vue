<script setup>
import { usePatientStore } from '@/stores/patients'
import { Button } from '@/components/ui/button'
import PatientForm from './PatientForm.vue'
import DataTableDropdown from './DataTableDropdown.vue'
import { Table, TableHeader, TableHead, TableCell, TableRow } from '@/components/ui/table'
const patientStore = usePatientStore()

const handleAddNew = () => {
  patientStore.resetPatient()
  patientStore.toggleOpen()
}
</script>

<template>
  <div class="w-full h-screenp-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Patients</h2>
      <Button @click="handleAddNew">Add New Patient</Button>
    </div>
    <!-- <DataTable :columns="patientColumns" :data="patientStore.patients" />
      -->
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Diagnosis</TableHead>
          <TableHead>Protocol</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
        <TableRow v-for="patient in patientStore.patients" :key="patient.id">
          <TableCell>{{ patient.name }}</TableCell>
          <TableCell>{{ patient.age }}</TableCell>
          <TableCell>{{ patient.address }}</TableCell>
          <TableCell>{{ patient.diagnosis }}</TableCell>
          <TableCell>{{ patient.protocol }}</TableCell>
          <TableCell>
            <DataTableDropdown :patient="patient" />
          </TableCell>
        </TableRow>
      </TableHeader>
    </Table>
    <PatientForm />
  </div>
</template>
