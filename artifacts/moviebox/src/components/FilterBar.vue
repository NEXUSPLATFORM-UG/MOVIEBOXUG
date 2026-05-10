<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label class="filter-label">Genre</label>
      <div class="filter-chips">
        <button
          v-for="g in genres"
          :key="g"
          class="chip"
          :class="{ active: selectedGenre === g }"
          @click="selectedGenre = g; emit('filter', getFilters())"
        >{{ g }}</button>
      </div>
    </div>

    <div class="filter-row">
      <div class="select-wrap">
        <label class="filter-label">Year</label>
        <select class="filter-select" v-model="selectedYear" @change="emit('filter', getFilters())">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <div class="select-wrap">
        <label class="filter-label">Sort By</label>
        <select class="filter-select" v-model="selectedSort" @change="emit('filter', getFilters())">
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  filter: [{ genre: string; year: string; sort: string }];
}>();

const genres = ["All", "Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance", "Thriller", "Crime", "Fantasy", "Mystery", "Adventure"];
const years = ["All", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

const selectedGenre = ref("All");
const selectedYear = ref("All");
const selectedSort = ref("latest");

function getFilters() {
  return { genre: selectedGenre.value, year: selectedYear.value, sort: selectedSort.value };
}
</script>

<style scoped>
.filter-bar {
  background: #16181d;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.chip:hover {
  border-color: rgba(255, 255, 255, 0.25);
  color: white;
}

.chip.active {
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-color: transparent;
  color: #101114;
  font-weight: 700;
}

.filter-row {
  display: flex;
  gap: 12px;
}

.select-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.filter-select {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  padding: 7px 10px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: rgba(44, 215, 255, 0.4);
}

.filter-select option {
  background: #1e2029;
  color: white;
}

@media (max-width: 480px) {
  .filter-bar {
    padding: 12px;
    border-radius: 8px;
  }

  .chip {
    font-size: 11px;
    padding: 4px 10px;
  }
}
</style>
