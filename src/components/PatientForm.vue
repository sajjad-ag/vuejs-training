<script setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { usePatientStore } from '@/stores/patients'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { computed, watch } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useToast } from './ui/toast'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar as CalendarIcon, Trash2Icon } from 'lucide-vue-next'
import { Calendar } from './ui/calendar'
import { cn } from '@/lib/utils'
import { toDate } from 'radix-vue/date'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
const { toast } = useToast()
const patientStore = usePatientStore()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.number({ invalid_type_error: 'Age must be a number' }),
    address: z.string().min(1, 'Address is required'),
    diagnosis: z.string().min(1, 'Diagnosis is required'),
    protocol: z.string().min(1, 'Protocol is required'),
    date: z.string().min(1, 'Date is required'),
    bsa: z.string().min(1, 'BSA is required'),
    room: z.string().min(1, 'Room is required'),
    gender: z.string().min(1, 'Gender is required'),
    caseSheetNumber: z.string().min(1, 'Case sheet number is required'),
    protocolName: z.string().min(1, 'Protocol name is required'),
    numberOfDoses: z.number({ invalid_type_error: 'Number of doses must be a number' }),
    specialist: z.string().min(1, 'Specialist name is required'),
    drugs: z
      .array(
        z.object({
          no: z.string(),
          name: z.string(),
          dilutedIn: z.string(),
          routOfAdministration: z.string(),
          timeToStartAdministration: z.string(),
          durationOfAdministration: z.string(),
          note: z.string(),
          dose: z.string(),
        }),
      )
      .optional(),
  }),
)
const form = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
  initialValues: {
    name: patientStore.patient.name,
    age: patientStore.patient.age,
    address: patientStore.patient.address,
    diagnosis: patientStore.patient.diagnosis,
    protocol: patientStore.patient.protocol,
    date: patientStore.patient.date,
    bsa: patientStore.patient.bsa,
    room: patientStore.patient.room,
    gender: patientStore.patient.gender,
    caseSheetNumber: patientStore.patient.caseSheetNumber,
    protocolName: patientStore.patient.protocolName,
    numberOfDoses: patientStore.patient.numberOfDoses,
    specialist: patientStore.patient.specialist,
    drugs: patientStore.patient.drugs,
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
      date: newPatient.date,
      bsa: newPatient.bsa,
      room: newPatient.room,
      gender: newPatient.gender,
      caseSheetNumber: newPatient.caseSheetNumber,
      protocolName: newPatient.protocolName,
      numberOfDoses: newPatient.numberOfDoses,
      specialist: newPatient.specialist,
      drugs: newPatient.drugs,
    })
  },
  { immediate: true },
)

watch(
  () => form.errors.value,
  (newErrors) => {
    console.log('Form errors:', newErrors)
  },
  { deep: true, immediate: true },
)
const value = computed({
  get: () => (form.values.date ? parseDate(form.values.date) : undefined),
  set: (val) => val,
})

const addDrug = () => {
  form.setFieldValue('drugs', [
    ...form.values.drugs,
    {
      id: Date.now().toString(),
    },
  ])
}

const removeDrug = (index) => {
  form.setFieldValue(
    'drugs',
    form.values.drugs.filter((_, i) => i !== index),
  )
}

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
  if (patientStore.patient.id) {
    patientStore.updatePatient(patientStore.patient.id, values)
    toast({
      title: 'Patient information updated',
      description: 'Patient information has been updated successfully',
      variant: 'success',
    })
  } else {
    patientStore.addPatient(values)
    form.resetForm()
    toast({
      title: 'Patient added',
      description: 'Patient information has been added successfully',
      variant: 'success',
    })
  }
})
</script>

<template>
  <div class="space-y-4">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="grid grid-cols-12 gap-2 col-span-12 border border-primary p-4 rounded-xl">
          <h2 class="text-2xl font-bold col-span-12">Personal Information</h2>
          <FormField name="name" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Patient name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="age" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="gender">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Gender</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient's gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="bsa" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>BSA</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="address" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Patient address" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid grid-cols-12 gap-2 col-span-12 border border-primary p-4 rounded-xl">
          <div class="col-span-12"><h2 class="text-2xl font-bold">Medical Information</h2></div>
          <FormField name="diagnosis" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Diagnosis</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="protocol" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Treatment Protocol</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="protocolName" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-4">
              <FormLabel>Protocol Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="numberOfDoses" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-3">
              <FormLabel>Number of Doses</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="caseSheetNumber" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-3">
              <FormLabel>Case sheet number</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="room" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-3">
              <FormLabel>Room number</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="specialist" v-slot="{ componentField }">
            <FormItem class="col-span-12 md:col-span-3">
              <FormLabel>Specialist Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="date">
            <FormItem class="flex flex-col justify-center col-span-12 md:col-span-4">
              <FormLabel>Session date</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-[full] h-10ps-3 text-start font-normal',
                          !value && 'text-muted-foreground',
                        )
                      "
                    >
                      <span>{{ value ? df.format(toDate(value)) : 'Pick a date' }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                    <input hidden />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar
                    v-model:placeholder="placeholder"
                    v-model="value"
                    calendar-label="Date of birth"
                    initial-focus
                    :min-value="new CalendarDate(1900, 1, 1)"
                    :max-value="today(getLocalTimeZone())"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          form.setFieldValue('date', v.toString())
                        } else {
                          form.setFieldValue('date', undefined)
                        }
                      }
                    "
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid grid-cols-12 gap-4 col-span-12 border border-primary p-4 rounded-xl">
          <div class="flex justify-between items-center col-span-12">
            <h2 class="text-2xl font-bold">Drugs</h2>
            <Button @click="addDrug" type="button">Add Drug</Button>
          </div>
          <FormField name="drugs" v-slot="{ componentField }">
            <FormItem class="col-span-12">
              <div class="flex flex-col gap-4">
                <div
                  v-for="(drug, index) in componentField.modelValue"
                  :key="index"
                  class="flex flex-col gap-4"
                >
                  <div class="grid grid-cols-12 gap-2">
                    <div class="col-span-12 md:col-span-3 space-y-2">
                      <Label for="drug-no">Drug No</Label>
                      <Input type="text" v-model="drug.no" placeholder="No" id="drug-no" />
                    </div>
                    <div class="col-span-12 md:col-span-3 space-y-2">
                      <Label for="drug-name">Drug Name</Label>
                      <Input type="text" v-model="drug.name" placeholder="Name" id="drug-name" />
                    </div>
                    <div class="col-span-12 md:col-span-3 space-y-2">
                      <Label for="diluted-in">Diluted in</Label>
                      <Input
                        type="text"
                        v-model="drug.dilutedIn"
                        placeholder="Diluted In"
                        id="diluted-in"
                      />
                    </div>
                    <div class="col-span-12 md:col-span-3 space-y-2">
                      <Label for="dose">Dose</Label>
                      <Input type="text" v-model="drug.dose" placeholder="Dose" id="dose" />
                    </div>
                    <div class="col-span-12 md:col-span-4 space-y-2">
                      <Label for="rout-of-administration">Rout Of Administration</Label>
                      <Input
                        type="text"
                        v-model="drug.routOfAdministration"
                        placeholder="Rout Of Administration"
                        id="rout-of-administration"
                      />
                    </div>

                    <div class="col-span-12 md:col-span-4 space-y-2">
                      <Label for="time-to-start-administration">Time To Start Administration</Label>
                      <Input
                        type="text"
                        v-model="drug.timeToStartAdministration"
                        placeholder="Time To Start Administration"
                        id="time-to-start-administration"
                      />
                    </div>

                    <div class="col-span-12 md:col-span-4 space-y-2">
                      <Label for="duration-of-administration">Duration Of Administration</Label>
                      <Input
                        type="text"
                        v-model="drug.durationOfAdministration"
                        placeholder="Duration Of Administration"
                        id="duration-of-administration"
                      />
                    </div>

                    <div class="col-span-12 md:col-span-4 space-y-2">
                      <Label for="note">Note</Label>
                      <Textarea v-model="drug.note" placeholder="Notes" id="note" />
                    </div>
                  </div>
                  <div class="col-span-12">
                    <Button @click="removeDrug(index)" type="button" size="sm" variant="destructive"
                      >Remove Drug</Button
                    >
                  </div>
                  <Separator class="my-4 text-primary" />
                </div>
              </div>
            </FormItem>
          </FormField>
        </div>
        <div class="col-span-12 flex justify-end">
          <Button type="submit">{{
            patientStore.patient.id ? 'Update Patient' : 'Add Patient'
          }}</Button>
        </div>
      </div>
    </form>
  </div>
</template>
