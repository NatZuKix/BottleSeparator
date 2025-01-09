<template>
  <div class="max-w-md mx-auto">
    <canvas ref="donutChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart } from 'chart.js/auto';

// Define props
const props = defineProps({
  bottle: {
    type: Number,
    required: true,
    default: 0
  },
  can: {
    type: Number,
    required: true,
    default: 0
  }
});

// Initialize chartData and chartOptions
const chartData = ref({
  labels: [`Bottle (${props.bottle})`, `Can (${props.can})`],
  datasets: [
    {
      label: 'My Trash',
      data: [props.bottle, props.can],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

// Ref for the chart instance
const donutChart = ref(null);

// Initialize chart onMounted
let chartInstance = null;
onMounted(() => {
  const ctx = donutChart.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: chartData.value,
    options: chartOptions,
  });
});

// Watch for changes in bottle and can props
watch(
  () => [props.bottle, props.can],
  (newValues) => {
    const [newBottle, newCan] = newValues;
    chartData.value.labels = [`Bottle (${newBottle})`, `Can (${newCan})`];
    chartData.value.datasets[0].data = [newBottle, newCan];
    
    // Update the chart with the new data
    if (chartInstance) {
      chartInstance.update();
    }
  },
  { immediate: true } // Trigger watch immediately
);
</script>
