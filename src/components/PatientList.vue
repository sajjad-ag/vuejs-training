<script setup>
import { usePatientStore } from '@/stores/patients'
import { Button } from '@/components/ui/button'
import DataTableDropdown from './DataTableDropdown.vue'
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@/components/ui/table'
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
      <h2 class="text-2xl font-bold">Patients Management</h2>
      <Button @click="handleAddNew">Add New Patient</Button>
    </div>

    <div class="overflow-x-auto w-full h-full rounded-xl border border-gray-400">
      <Table>
        <TableHeader v-if="patientStore.patients.length > 0">
          <TableRow class="text-left">
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
        <TableBody v-else>
          <TableRow>
            <TableCell colspan="6" class="text-center">No patients found</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
