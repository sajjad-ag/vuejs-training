<script setup>
import { usePatientStore } from '@/stores/patients'
import { Button } from '@/components/ui/button'

import { useRouter } from 'vue-router'
import DataTable from './ui/data-table/DataTable.vue'
import { patientColumns } from './columns'
const router = useRouter()
const patientStore = usePatientStore()
</script>

<template>
  <div class="w-full p-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Patients</h2>
      <Button @click="router.push('/new-patient')"> Add New Patient </Button>
    </div>
    <DataTable :columns="patientColumns" :data="patientStore.patients" />
  </div>
</template>
