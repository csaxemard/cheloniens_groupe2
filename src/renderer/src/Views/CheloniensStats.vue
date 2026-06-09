<script setup>
    import MainLayout from '@/Layouts/MainLayout.vue';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';

 
    

    const reponse = ref('');
    const isError = ref(false);


    async function submitForm(event) {
        // Récupère les champs du formulaire (les inputs ayant un attribut name)
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Le champ fichier "photo" : on n'envoie que le nom du fichier (pas le binaire)
        const photoFile = formData.get('photo');
        data.photos = photoFile && photoFile.name ? photoFile.name : null;
        delete data.photo;

        // Les champs vides deviennent null (évite les erreurs sur les colonnes numériques)
        for (const key in data) {
            if (data[key] === '') data[key] = null;
        }

        try {
            const res = await fetch('http://localhost:3000/api/observations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (res.ok && result.success) {
                isError.value = false;
                reponse.value = 'Observation enregistrée. Merci ! 🐢';
                event.target.reset();
            } else {
                isError.value = true;
                reponse.value = result.error || 'Une erreur est survenue.';
            }
        } catch (e) {
            isError.value = true;
            reponse.value = 'Impossible de contacter le serveur.';
        }
    }


  

    async function chargerAPI() {
        loading.value=true;
       
        const response = await axios.get('https://api.inaturalist.org');
    }   
  

</script>

<template>
    
    <MainLayout style="min-height: 100vh;">
        <main class="SawTurtle centeredX offsetTop">
            <h1>Observation de tortues marines</h1>
        <v-btn
          color="primary"
          size="large"
          @click="chargerAPI"
          :loading="loading"
          prepend-icon="mdi-cloud-download"
          elevation="3"
        >
          Test
        </v-btn>
            
        </main>
    </MainLayout>
</template>

<style scoped>
    .SawTurtle {
        text-align: center;
    }

    h1 {
        color: green;
    }

    label {
        display: block;
        margin-bottom: .85rem;
        font-size: .9rem;
        color: #374151;
    }

    input, select, textarea {
        display: block;
        width: 100%;
        margin-top: .25rem;
        padding: .5rem;
        border: 1px solid #000000;
        border-radius: 6px;
        box-sizing: border-box;
        font: inherit;
    }

    #reponse {
        color: green;
        font-weight: bold;
    }

    #reponse.error {
        color: crimson;
    }
    #map {height: 100vh; width: 100%;}
</style>
