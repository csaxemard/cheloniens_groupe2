<script setup>
    import MainLayout from '@/Layouts/MainLayout.vue';
    import { onMounted, ref } from 'vue';
    import "leaflet/dist/leaflet.css"
    import * as L from 'leaflet'; 
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    

    const reponse = ref('');
    const isError = ref(false);
    const mapEl = ref(null);
    let map = null;
    
//    const myIcon = L.icon({
//     iconUrl: '/resources/icon.png',
//     iconSize: [30, 30],
//     iconAnchor: [15, 30],
//     popupAnchor: [0, -30],
//     });


    async function submitForm(event) {
        // Retrieves the form fields
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // The "photo" file field: only the file name is sent (not the binary).
        const photoFile = formData.get('photo');
        data.photos = photoFile && photoFile.name ? photoFile.name : null;
        delete data.photo;

       // Empty fields become null (avoids errors on numeric columns)
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


    onMounted(() => {
        setTimeout(() => {
           if (!mapEl.value) return;
           
           map = L.map(mapEl.value).setView([14.637178457185568, -60.97429758012232], 12);
           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom:19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           }).addTo(map);

            map.on('click', function(e) {
                const lat = e.latlng.lat;
                const lng = e.latlng.lng;
                const marker = L.marker([lat,lng]).addTo(map);
                // const marker = L.marker([lat,lng], { icon: myIcon }).addTo(map);
                marker.bindPopup(`Coordonnées : ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
                console.log("Latitude: " + lat + ", Longitude: " + lng);
                
                const localisationInput = document.querySelector('input[name="localisation"]');
                if (localisationInput) {
                    localisationInput.value = `${lat}, ${lng}`;
                }
            }); 
        
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

            <!-- @submit.prevent prevents the page from reloading (causes the white screen) -->
            <div>
                <h3>Cliquez sur le lieu d'observation</h3>
                <div ref="mapEl" style="height: 90vh;"></div>
            </div>
           
            <form id="monFormulaire" @submit.prevent="submitForm">
                <input type="text" name="localisation" placeholder="Localisation"><br><br>
                <input type="date" name="date_observation" placeholder="Date d'observation"><br><br>
                <input type="text" name="meteo" placeholder="Météo"><br><br>
                <label style="color: black;">Espèce <span class="req">*</span>
                    <select name="espece" required>
                        <option value="">— Sélectionner —</option>
                        <option>Tortue verte (Chelonia mydas)</option>
                        <option>Tortue imbriquée (Eretmochelys imbricata)</option>
                        <option>Tortue luth (Dermochelys coriacea)</option>
                        <option>Tortue caouanne (Caretta caretta)</option>
                        <option>Tortue olivâtre (Lepidochelys olivacea)</option>
                        <option>Espèce indéterminée</option>
                    </select>

                </label> <br><br>
                <label style="color: black;">Sexe
                    <select name="sexe">
                        <option value="">Indéterminé</option>
                        <option>Mâle</option>
                        <option>Femelle</option>
                    </select>
                </label> <br><br>

                <label style="color: black;">Stade
                    <select name="stade">
                        <option value="">Indéterminé</option>
                        <option>Juvénile</option>
                        <option>Subadulte</option>
                        <option>Adulte</option>
                    </select>
                </label> <br><br>

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
