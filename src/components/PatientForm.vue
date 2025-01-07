<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { usePatientStore } from '@/stores/patients'

const emit = defineEmits(['save'])

const patientStore = usePatientStore()

const patientData = ref({})
const handleSubmit = () => {
  emit('save', patientData.value)
}

onMounted(() => {
  patientData.value = patientStore.patient
})

onUnmounted(() => {
  patientStore.resetPatient()
})
</script>

<template>
  <Card class="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>{{ patientData.id ? 'Edit Patient' : 'New Patient' }}</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="patientData.name" required />
        </div>

        <div class="space-y-2">
          <Label for="age">Age</Label>
          <Input id="age" v-model="patientData.age" type="number" required />
        </div>

        <div class="space-y-2">
          <Label for="address">Address</Label>
          <Input id="address" v-model="patientData.address" required />
        </div>

        <div class="space-y-2">
          <Label for="diagnosis">Diagnosis</Label>
          <Textarea id="diagnosis" v-model="patientData.diagnosis" rows="4" />
        </div>

        <div class="space-y-2">
          <Label for="protocol">Treatment Protocol</Label>
          <Textarea id="protocol" v-model="patientData.protocol" rows="4" />
        </div>

        <Button type="submit" class="w-full"> Save Patient </Button>
      </form>
    </CardContent>
  </Card>
</template>
