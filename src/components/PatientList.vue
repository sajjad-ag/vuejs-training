<script setup>
import { usePatientStore } from '@/stores/patients'
import { Button } from '@/components/ui/button'
import DataTableDropdown from './DataTableDropdown.vue'
import { Table, TableHeader, TableHead, TableCell, TableRow } from '@/components/ui/table'
import { useRouter } from 'vue-router'
const patientStore = usePatientStore()

const router = useRouter()

const handleAddNew = () => {
  patientStore.resetPatient()
  router.push('/new-patient')
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
  </div>
</template>
