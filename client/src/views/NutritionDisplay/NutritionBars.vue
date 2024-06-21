<script setup lang="ts">
const data = [
  { percentage: Math.round(Math.random() * 100), name: 'Calories' },
  { percentage: Math.round(Math.random() * 100), name: 'Salt' },
  { percentage: Math.round(Math.random() * 100), name: 'Sugar' },
  { percentage: Math.round(Math.random() * 100), name: 'Fat' }
]

const classTexts: any[] = []
const styleTexts: any[] = []

data.forEach((entry) => {
  let color = ''

  if (entry.percentage > 70) {
    color = 'red'
  } else if (entry.percentage > 50) {
    color = 'orange'
  } else if (entry.percentage > 30) {
    color = 'yellow'
  } else if (entry.percentage > 5) {
    color = 'green'
  } else {
    color = 'darkgreen'
  }

  classTexts.push({ color: color, percentage: entry.percentage, name: entry.name })
})


</script>

<template>
  <div class="container-fluid p-2">
    <div v-for="item in classTexts" class="flex-row">
      <div class="d-flex fleq-row">
          <div class="bar-item-name col-2">
            {{ item.name }}
          </div>
          <div class="bar col-8 bar">
            <div class="bar-fill-background"></div>
            <div :class="'bar-fill ' + item.color" :style="'width: ' + item.percentage + '%; '"></div>
          </div>
          <div class="col-2">
            {{ item.percentage }}%
          </div>
        </div>
    </div>
  </div>
</template>

<style>
.bar-item-name {
  margin-left: 2%;
}

.bar-fill-background {
  background-color: rgb(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  translate: 0 0px;
  border-radius: 5px;
}

.bar-fill {
  height: 100%;
  border-radius: 5px;
  translate: 0 -7px;
}

.bar {
  height: 7px;
  margin: 2%;
}

.red {
  background-color: red;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: rgb(218, 203, 0);
}

.green {
  background-color: green;
}

.darkgreen {
  background-color: darkgreen;
}
</style>
