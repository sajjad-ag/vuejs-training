<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { usePatientStore } from '@/stores/patients'
import { RouterLink } from 'vue-router'

const patientStore = usePatientStore()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <RouterLink to="/" :class="navigationMenuTriggerStyle()">Patients Management</RouterLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <RouterLink
          to="/new-patient"
          :class="navigationMenuTriggerStyle()"
          @click="patientStore.resetPatient()"
          >New Patient</RouterLink
        >
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
