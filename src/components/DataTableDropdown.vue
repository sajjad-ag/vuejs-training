<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import router from '@/router'
import { usePatientStore } from '@/stores/patients'

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const patientStore = usePatientStore()

const handleDelete = (id) => {
  patientStore.deletePatient(id)
}

const handleEdit = (patient) => {
  console.log(patient)
  patientStore.setPatient(patient)
  router.push(`/patient/${patient.id}/edit`)
}

const handleView = (patient) => {
  patientStore.setPatient(patient)
  router.push(`/patient/${patient.id}`)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as="Button" variant="ghost" class="w-8 h-8">...</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="handleView(patient)"> View </DropdownMenuItem>
      <DropdownMenuItem @click="handleEdit(patient)"> Edit </DropdownMenuItem>
      <DropdownMenuItem @click="handleDelete(patient.id)"> Delete </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
