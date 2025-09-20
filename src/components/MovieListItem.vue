<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const handleItemClick = () => {
  console.log(`Movie item clicked, ID: ${movieId}. Ready to navigate!`);
};
</script>

<template>
  <div
    @click="handleItemClick(movie.id)"
    class="grid grid-cols-3 gap-4 items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
  >
    <div class="col-span-2">
      <h3 class="text-lg font-semibold text-gray-800">{{ movie.title }}</h3>
      <p class="text-sm text-gray-600">{{ movie.director }}</p>
    </div>

    <div class="col-span-1 flex flex-wrap justify-end gap-2">
      <span
        v-for="genre in movie.genres"
        :key="genre"
        class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
      >
        {{ genre }}
      </span>
    </div>
  </div>
</template>
