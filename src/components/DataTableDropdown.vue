<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePatientStore } from '@/stores/patients'
import { useRouter } from 'vue-router'
import { useToast } from './ui/toast'
import { Trash2Icon, EditIcon, PrinterIcon } from 'lucide-vue-next'
import { Button } from './ui/button'
const router = useRouter()

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const patientStore = usePatientStore()

const { toast } = useToast()

const handleDelete = (id) => {
  try {
    patientStore.deletePatient(id)
    toast({
      title: 'Patient deleted',
      description: 'Patient information has been deleted successfully',
      variant: 'success',
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Error deleting patient',
      variant: 'destructive',
    })
  }
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
  <!-- <DropdownMenu>
    <DropdownMenuTrigger as="Button" variant="ghost" class="w-8 h-8">...</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="() => handleView(patient)"> View </DropdownMenuItem>
      <DropdownMenuItem @click="() => handleEdit(patient)"> Edit </DropdownMenuItem>
      <DropdownMenuItem @click="() => handleDelete(patient.id)"> Delete </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu> -->
  <div class="flex items-center justify-start">
    <Button
      variant="ghost"
      size="sm"
      @click="() => handleEdit(patient)"
      class="hover:bg-primary/10 rounded-full h-9 w-9 flex items-center justify-center"
    >
      <EditIcon class="w-5 h-5 text-primary" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      @click="() => handleView(patient)"
      class="hover:bg-blue-500/10 rounded-full h-9 w-9 flex items-center justify-center"
    >
      <PrinterIcon class="w-5 h-5 text-blue-500" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      @click="() => handleDelete(patient.id)"
      class="hover:bg-destructive/10 rounded-full h-9 w-9 flex items-center justify-center"
    >
      <Trash2Icon class="w-5 h-5 text-destructive" />
    </Button>
  </div>
</template>
