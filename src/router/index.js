import NotFound from '@/components/NotFound.vue'
import PatientForm from '@/components/PatientForm.vue'
import PatientList from '@/components/PatientList.vue'
import PatientView from '@/components/PatientView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'patients',
      component: PatientList,
    },
    {
      path: '/new-patient',
      name: 'new-patient',
      component: PatientForm,
    },
    {
      path: '/patient/:id',
      name: 'patient-view',
      component: PatientView,
    },
    {
      path: '/patient/:id/edit',
      name: 'patient-edit',
      component: PatientForm,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
})

export default router
