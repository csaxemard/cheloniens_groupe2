<script setup>
import MainLayout from '@/Layouts/MainLayout.vue';
import { ref } from 'vue';
import axios from 'axios';


const isError = ref(false);


async function chargerAPI() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
}
</script>

<template>
  <MainLayout style="min-height: 100vh;">
    <main class="cheloniens-stats centeredX offsetTop">
      <h1>Consultation des espèces (chéloniens)</h1>
      <p>Recherchez des observations de tortues marines.</p>

      <div class="search-bar">
        <button @click="chargerAPI" :disabled="loading">
        </button>
      </div>

     
    </main>
  </MainLayout>
</template>

<style scoped>
.cheloniens-stats {
  text-align: center;
  padding: 1rem;
}
h1 {
  color: green;
}
.search-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}
.search-bar input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.search-bar button {
  background-color: green;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.search-bar button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
.results {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.observation-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  background: #f9f9f9;
  text-align: left;
}
.photos img {
  width: 100%;
  height: auto;
  margin-top: 0.5rem;
  border-radius: 4px;
}
#reponse {
  color: green;
  font-weight: bold;
  margin: 1rem 0;
}
#reponse.error {
  color: crimson;
}
.no-results {
  margin-top: 2rem;
  color: #666;
}
</style>