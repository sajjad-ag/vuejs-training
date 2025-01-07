<script setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePatientStore } from '@/stores/patients'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { onMounted, watch } from 'vue'

const patientStore = usePatientStore()
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    age: z.number().min(2).max(50),
    address: z.string().min(2).max(50),
    diagnosis: z.string().min(2).max(50),
    protocol: z.string().min(2).max(50),
  }),
)
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: patientStore.patient.name,
    age: patientStore.patient.age,
    address: patientStore.patient.address,
    diagnosis: patientStore.patient.diagnosis,
    protocol: patientStore.patient.protocol,
  },
})

watch(
  () => patientStore.patient,
  (newPatient) => {
    form.setValues({
      name: newPatient.name,
      age: newPatient.age,
      address: newPatient.address,
      diagnosis: newPatient.diagnosis,
      protocol: newPatient.protocol,
    })
  },
  { immediate: true },
)

const onSubmit = form.handleSubmit((values) => {
  if (patientStore.patient.id) {
    patientStore.updatePatient(patientStore.patient.id, values)
  } else {
    patientStore.addPatient(values)
    patientStore.toggleOpen()
  }
})
</script>

<template>
  <Dialog :open="patientStore.open" @update:open="(value) => !value && patientStore.toggleOpen()">
    <!-- <DialogHeader>
      <DialogTitle>{{ patientData?.id ? 'Edit Patient' : 'New Patient' }}</DialogTitle>
    </DialogHeader> -->
    <DialogContent>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <FormField name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Patient name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="age" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="address" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Patient address" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="diagnosis" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Diagnosis</FormLabel>
            <FormControl>
              <Textarea i rows="4" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="protocol" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Treatment Protocol</FormLabel>
            <FormControl>
              <Textarea i rows="4" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="patientStore.patient.name" required />
        </div> -->

        <!-- <div class="space-y-2">
          <Label for="age">Age</Label>
          <Input id="age" type="number" required v-model="patientStore.patient.age" />
        </div> -->

        <!-- <div class="space-y-2">
          <Label for="address">Address</Label>
          <Input id="address" required v-model="patientStore.patient.address" />
        </div> -->

        <!-- <div class="space-y-2">
          <Label for="diagnosis">Diagnosis</Label>
          <Textarea id="diagnosis" rows="4" v-model="patientStore.patient.diagnosis" />
        </div> -->

        <!-- <div class="space-y-2">
          <Label for="protocol">Treatment Protocol</Label>
          <Textarea id="protocol" rows="4" v-model="patientStore.patient.protocol" />
        </div> -->
        <DialogFooter>
          <Button type="submit">
            {{ patientStore.patient.id ? 'Update Patient' : 'Add Patient' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
