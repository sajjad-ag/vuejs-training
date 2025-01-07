import { h } from 'vue'
import DataTableDropdown from './DataTableDropdown.vue'

export const patientColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: ({ row }) => {
      const patient = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DataTableDropdown, {
          patient,
        }),
      )
    },
  },
]
