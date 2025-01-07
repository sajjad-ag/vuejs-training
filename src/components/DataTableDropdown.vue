<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePatientStore } from '@/stores/patients'
import { useRouter } from 'vue-router'

const router = useRouter()

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
      <DropdownMenuItem @click="() => handleView(patient)"> View </DropdownMenuItem>
      <DropdownMenuItem @click="() => handleEdit(patient)"> Edit </DropdownMenuItem>
      <DropdownMenuItem @click="() => handleDelete(patient.id)"> Delete </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
