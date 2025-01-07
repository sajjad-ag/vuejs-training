<script>
import html2pdf from 'html2pdf.js'

export default {
  setup() {
    const downloadPDF = () => {
      const element = document.getElementById('pdf-content')
      const options = {
        margin: 1,
        filename: 'patient-details.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }
      html2pdf().set(options).from(element).save()
    }

    return {
      downloadPDF,
    }
  },
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Patient Details</h1>
    <button @click="downloadPDF" class="bg-blue-500 text-white px-4 py-2 rounded">
      Download PDF
    </button>
    <div id="pdf-content" class="border p-4">
      <h2 class="text-xl font-bold mb-2">Patient Protocol</h2>
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Age:</strong> 35</p>
      <p><strong>Address:</strong> 123 Main St</p>
      <p><strong>Diagnosis:</strong> Example Diagnosis</p>
      <p><strong>Protocol:</strong> Example Protocol</p>
    </div>
  </div>
</template>
