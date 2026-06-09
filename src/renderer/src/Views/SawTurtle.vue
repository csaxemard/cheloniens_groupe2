<script setup>
    import MainLayout from '@/Layouts/MainLayout.vue';
    import { onMounted, ref } from 'vue';
    import "leaflet/dist/leaflet.css"
    import * as L from 'leaflet'; 
    import { Geolocation } from '@capacitor/geolocation';
    import { Network } from '@capacitor/network';

    const reponse = ref('');
    const isError = ref(false);
    
    const latitudeInput = ref('');
    const longitudeInput = ref('');
    
    const mapEl = ref(null);
    let map = null;
    let marker = null;

    // Fonction de géolocalisation hybride (Capacitor sur mobile, API Geolocation sur PC)
    async function getGPSLocation() {
        try {
            const isDesktop = typeof window !== 'undefined' && 'electron' in window;
            let lat = 14.64, lng = -61.02; // Centrage par défaut sur la Martinique

            if (!isDesktop) {
                // Utilise le plugin mobile natif de Capacitor
                const coordinates = await Geolocation.getCurrentPosition();
                lat = coordinates.coords.latitude;
                lng = coordinates.coords.longitude;
            } else if (navigator.geolocation) {
                // Utilise l'API standard du navigateur Web sur PC
                navigator.geolocation.getCurrentPosition((position) => {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    updateMapCenter(lat, lng);
                });
                return;
            }
            updateMapCenter(lat, lng);
        } catch (e) {
            console.error("Erreur de géolocalisation, repli sur la Martinique :", e);
            updateMapCenter(14.64, -61.02);
        }
    }

    function updateMapCenter(lat, lng) {
        if (map) {
            map.setView([lat, lng], 13);
            if (marker) {
                marker.setLatLng([lat, lng]);
            } else {
                marker = L.marker([lat, lng], { draggable: true }).addTo(map);
                marker.on('dragend', () => {
                    const pos = marker.getLatLng();
                    latitudeInput.value = pos.lat.toFixed(6);
                    longitudeInput.value = pos.lng.toFixed(6);
                });
            }
            latitudeInput.value = lat.toFixed(6);
            longitudeInput.value = lng.toFixed(6);
        }
    }

    // Soumission du formulaire
    async function submitForm(event) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Injection des coordonnées GPS
        data.latitude = latitudeInput.value;
        data.longitude = longitudeInput.value;

        const photoFile = formData.get('photo');
        data.photos = photoFile && photoFile.name ? photoFile.name : null;
        delete data.photo;

        for (const key in data) {
            if (data[key] === '') data[key] = null;
        }

        try {
            // Vérification de la connexion réseau via Capacitor
            const status = await Network.getStatus();
            if (!status.connected) {
                // Sauvegarde locale hors-ligne en JavaScript
                const pending = JSON.parse(localStorage.getItem('pending_observations') || '[]');
                pending.push(data);
                localStorage.setItem('pending_observations', JSON.stringify(pending));
                
                isError.value = false;
                reponse.value = 'Vous êtes hors-ligne. Signalement enregistré localement sur votre téléphone ! 🐢';
                event.target.reset();
                return;
            }

            // Envoi en ligne classique
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

    onMounted(() => {
        // Initialisation de la carte centrée par défaut sur la Martinique
        map = L.map('map').setView([14.64, -61.02], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Sélection des coordonnées sur clic de carte
        map.on('click', (e) => {
            updateMapCenter(e.latlng.lat, e.latlng.lng);
        });

        // Lance la géolocalisation automatique au montage
        getGPSLocation();
    });
</script>

<template>
    <MainLayout>
        <main class="SawTurtle centeredX offsetTop">
            <h1>Observation de tortues marines</h1>
            <p>Remplis le formulaire ci-dessous pour enregistrer une observation.</p>

            <div class="map-container">
                <h3>Cliquez sur la carte ou glissez le marqueur pour définir le lieu</h3>
                <button type="button" class="geoloc-btn" @click="getGPSLocation">Me géolocaliser (GPS)</button>
                <div id="map" ref="mapEl"></div>
            </div>
           
            <form id="monFormulaire" @submit.prevent="submitForm">
                <input type="text" name="localisation" placeholder="Localisation"><br><br>
                <input type="text" name="latitude" :value="latitudeInput" placeholder="Latitude (sélectionnée sur la carte)" readonly><br><br>
                <input type="text" name="longitude" :value="longitudeInput" placeholder="Longitude (sélectionnée sur la carte)" readonly><br><br>
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
        max-width: 800px;
        width: 90%;
        margin-bottom: 50px;
    }

    h1 {
        color: green;
    }

    .map-container {
        margin: 20px 0;
    }

    #map {
        height: 400px;
        width: 100%;
        border-radius: 8px;
        border: 2px solid #ccc;
        margin-top: 10px;
    }

    .geoloc-btn {
        background-color: #2e7d32;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .geoloc-btn:hover {
        background-color: #1b5e20;
    }

    #reponse {
        color: green;
        font-weight: bold;
    }

    #reponse.error {
        color: crimson;
    }
</style>
