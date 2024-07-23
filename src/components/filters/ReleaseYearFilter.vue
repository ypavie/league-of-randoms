<template>
  <!-- Thanks to @cbolson https://codepen.io/cbolson/pen/ExzKdjG -->
  <label for="fromSlider" class="block w-24 dark:text-gray-400 text-gray-700 font-bold">
    Year:
  </label>
  <div class="range_container">
    <div class="sliders_control">
      <input
        id="fromSlider"
        type="range"
        v-model="currentMinYear"
        :min="min"
        :max="max"
        @input="updateRange"
        class="slider"
      />
      <div id="fromSliderTooltip" class="slider-tooltip">{{ currentMinYear }}</div>
      <input
        id="toSlider"
        type="range"
        v-model="currentMaxYear"
        :min="min"
        :max="max"
        @input="updateRange"
        class="slider"
      />
      <div id="toSliderTooltip" class="slider-tooltip">{{ currentMaxYear }}</div>
    </div>
    <button
      @click="resetFilter"
      class="reset-button ml-2 p-1 text-red-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 1 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ReleaseYearFilter',
  data() {
    return {
      min: 2009,
      max: 2024,
      currentMinYear: 2009,
      currentMaxYear: 2024
    }
  },
  mounted() {
    this.createScale(this.min, this.max, 1)
    this.setTooltips()
    this.fillSlider()
  },
  methods: {
    getRangeMinMax() {
      console.log('getRangeMinMax', this.currentMinYear, this.currentMaxYear)
      return {
        min: this.currentMinYear,
        max: this.currentMaxYear
      }
    },
    updateRange() {
      if (this.currentMinYear > this.currentMaxYear) {
        ;[this.currentMinYear, this.currentMaxYear] = [this.currentMaxYear, this.currentMinYear]
      }
      this.setTooltips()
      this.fillSlider()
    },
    setTooltips() {
      this.setTooltip(
        document.getElementById('fromSlider'),
        document.getElementById('fromSliderTooltip')
      )
      this.setTooltip(
        document.getElementById('toSlider'),
        document.getElementById('toSliderTooltip')
      )
    },
    setTooltip(slider, tooltip) {
      const value = slider.value
      tooltip.textContent = value
      const thumbPosition = (value - slider.min) / (slider.max - slider.min)
      const percent = thumbPosition * 100
      const markerWidth = 20
      const offset = (((percent - 50) / 50) * markerWidth) / 2
      tooltip.style.left = `calc(${percent}% - ${offset}px)`
    },
    fillSlider() {
      const fromSlider = document.getElementById('fromSlider')
      const toSlider = document.getElementById('toSlider')
      const rangeDistance = this.max - this.min
      const fromPosition = this.currentMinYear - this.min
      const toPosition = this.currentMaxYear - this.min

      fromSlider.style.background = `linear-gradient(
        to right,
        #e5e7eb 0%,
        #e5e7eb ${(fromPosition / rangeDistance) * 100}%,
        #ff0000 ${(fromPosition / rangeDistance) * 100}%,
        #ff0000 ${(toPosition / rangeDistance) * 100}%,
        #e5e7eb ${(toPosition / rangeDistance) * 100}%,
        #e5e7eb 100%
      )`
    },
    createScale(min, max, step) {
      const range = max - min
      const steps = range / step
      for (let i = 0; i <= steps; i++) {
        const value = min + i * step
        const percent = ((value - min) / range) * 100
        const marker = document.createElement('div')
        marker.style.left = `${percent}%`
        marker.textContent = value
        // Append the marker to the scale container if you have one
        // document.querySelector('.scale_container').appendChild(marker);
      }
    },
    resetFilter() {
      this.currentMinYear = this.min
      this.currentMaxYear = this.max
      this.updateRange()
    }
  }
}
</script>

<style scoped>
.range_container {
  --_marker-border-clr: #ffffff;
  --_marker-size: 15px;
  --_track-height: 3px;
  --_tooltip-bg-clr: rgba(0, 0, 0, 0.6);
  --_tooltip-txt-clr: var(--_marker-border-clr);
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
}

.sliders_control {
  flex-grow: 1;
  position: relative;
  margin-right: 1rem;
}

.slider-tooltip {
  position: absolute;
  top: -3.5rem;
  left: 0;
  width: fit-content;
  background-color: var(--_tooltip-bg-clr);
  color: var(--_tooltip-txt-clr);
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  text-align: center;
  translate: -50% 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.slider:hover + .slider-tooltip {
  opacity: 1;
  pointer-events: auto;
}

.slider-tooltip::before {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 50%;
  translate: -50% 0;
  width: 0.5rem;
  height: 0.5rem;
  rotate: 45deg;
  z-index: -1;
  background-color: inherit;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  height: var(--_track-height);
  width: 100%;
  position: absolute;
  pointer-events: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: var(--_marker-size);
  height: var(--_marker-size);
  background-color: var(--_marker-border-clr);
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--_marker-border-clr);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: var(--_marker-size);
  height: var(--_marker-size);
  background-color: var(--_marker-border-clr);
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--_marker-border-clr);
  cursor: pointer;
}

.slider::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

.slider::-webkit-slider-thumb:active {
  box-shadow:
    inset 0 0 3px #fff,
    0 0 9px #fff;
}

.reset-button {
  display: flex;
  align-items: center;
}
</style>
