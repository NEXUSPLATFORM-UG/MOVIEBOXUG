<template>
  <div class="filter-bar">
    <!-- Region row -->
    <div class="filter-row">
      <button
        v-for="r in regions"
        :key="r"
        class="chip"
        :class="{ active: selectedRegion === r }"
        @click="selectedRegion = r; emitFilter()"
      >{{ r }}</button>
    </div>

    <!-- Genre row -->
    <div class="filter-row">
      <button
        v-for="g in genres"
        :key="g"
        class="chip"
        :class="{ active: selectedGenre === g }"
        @click="selectedGenre = g; emitFilter()"
      >{{ g }}</button>
    </div>

    <!-- Year row -->
    <div class="filter-row">
      <button
        v-for="y in years"
        :key="y"
        class="chip"
        :class="{ active: selectedYear === y }"
        @click="selectedYear = y; emitFilter()"
      >{{ y }}</button>
    </div>

    <!-- Sort row -->
    <div class="filter-row">
      <span class="row-label">Sort:</span>
      <button
        v-for="s in sorts"
        :key="s.value"
        class="chip"
        :class="{ active: selectedSort === s.value }"
        @click="selectedSort = s.value; emitFilter()"
      >{{ s.label }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  filter: [{ region: string; genre: string; year: string; sort: string }];
}>();

const regions = ["All", "Uganda", "USA", "Japan", "Korea", "UK", "India", "China", "Other"];
const genres  = ["All", "Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance", "Thriller", "Crime", "Fantasy", "Mystery", "Adventure"];
const years   = ["All", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"];
const sorts   = [
  { label: "Latest",     value: "latest"  },
  { label: "Popular",    value: "popular" },
  { label: "Top Rated",  value: "rating"  },
  { label: "A–Z",        value: "az"      },
];

const selectedRegion = ref("All");
const selectedGenre  = ref("All");
const selectedYear   = ref("All");
const selectedSort   = ref("latest");

function emitFilter() {
  emit("filter", {
    region: selectedRegion.value,
    genre:  selectedGenre.value,
    year:   selectedYear.value,
    sort:   selectedSort.value,
  });
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 18px;
  background: #16181d;
  border-radius: 10px;
  overflow: hidden;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 10px;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-wrap: nowrap;
}
.filter-row:last-child { border-bottom: none; }
.filter-row::-webkit-scrollbar { display: none; }

.row-label {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  white-space: nowrap;
  margin-right: 4px;
  flex-shrink: 0;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.6);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;
}
.chip:hover {
  border-color: rgba(255,255,255,0.2);
  color: white;
}
.chip.active {
  background: linear-gradient(91deg, #1cb7ff 0%, #2ff58b 100%);
  border-color: transparent;
  color: #101114;
  font-weight: 700;
}

@media (max-width: 480px) {
  .chip { font-size: 11px; padding: 3px 10px; }
  .filter-row { padding: 7px 8px; }
}
</style>
