<script setup>
    import MainLayout from '@/Layouts/MainLayout.vue';
    import { onMounted, ref } from 'vue';
    import "leaflet/dist/leaflet.css"
    import * as L from 'leaflet'; 
    

    const reponse = ref('');
    const isError = ref(false);
    const mapEl = ref(null);
    let map = null;


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
                headers: { 'Content-Type': 'application/json' }, // indispensable pour express.json()
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



    // onMounted(() => {
    //     map = L.map(mapEl.value).setView([49.1193089, 6.1757156], 12);
    //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19, 
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //     }).addTo(map);
    //     setTimeout(() => {
    //         map.invalidateSizet() 
    //     }, 100);
    // });

    onMounted(() => {
        setTimeout(() => {
           if (!mapEl.value) return;
           
           map = L.map(mapEl.value).setView([49.1193089, 6.1757156], 12);
           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom:19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           }).addTo(map);
        
           setTimeout(() => {
            map.invalidateSize();
           }, 100);
        }, 50);
    });



</script>

<template>
    
    <MainLayout style="min-height: 100vh;">
        <main class="SawTurtle centeredX offsetTop">
            <h1>Observation de tortues marines</h1>
            <p>Remplis le formulaire ci-dessous pour enregistrer une observation.</p>

            <!-- @submit.prevent empêche le rechargement de la page (cause de l'écran blanc) -->
            <div>
                <h3>Cliquez sur le lieu d'observation</h3>
                <div ref="mapEl" style="height: 90vh;"></div>
            </div>
           
            <form id="monFormulaire" @submit.prevent="submitForm">
                <input type="text" name="localisation" placeholder="Localisation"><br><br>
                <input type="date" name="date_observation" placeholder="Date d'observation"><br><br>
                <input type="text" name="meteo" placeholder="Météo"><br><br>
                <input type="number" name="nombre_tortues" placeholder="Nombre de tortues"><br><br>
                <input type="number" name="profondeur" placeholder="Profondeur (m)"><br><br>
                <input type="file" name="photo"><br><br>
                <input type="text" name="commentaires" placeholder="Commentaires"><br><br>

                <input type="submit" value="Envoyer">
            </form>

            <p id="reponse" :class="{ error: isError }">{{ reponse }}</p>
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

    #reponse {
        color: green;
        font-weight: bold;
    }

    #reponse.error {
        color: crimson;
    }
    #map {height: 100vh; width: 100%;}
</style>
