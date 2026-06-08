<script setup>
import { onMounted } from 'vue';

onMounted (() => {
document.getElementById('monFormulaire').addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this); 

            fetch('index.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('reponse').textContent = data;  
                this.reset(); 
            })
            .catch(error => console.error('Erreur :', error));
        });
})

</script>

<template>
    <div>
    <h1 style="color:green;">Observation de tortues marines</h1>
    <p>Remplis le formulaire ci-dessous pour enregistrer une observation.</p>

    <!-- enctype="multipart/form-data" est OBLIGATOIRE pour envoyer un fichier -->
    <form id="monFormulaire" method="post" action="traitement_formulaire.php"
          enctype="multipart/form-data">

        <input type="text"   name="localisation"     placeholder="Localisation"><br><br>
        <input type="date"   name="date_observation" placeholder="Date d'observation"><br><br>
        <input type="text"   name="meteo"            placeholder="Météo"><br><br>
        <input type="number" name="nombre_tortues"   placeholder="Nombre de tortues"><br><br>
        <input type="number" name="profondeur"       placeholder="Profondeur (m)"><br><br>
        <input type="file"   name="photo"><br><br>
        <input type="text"   name="commentaires"     placeholder="Commentaires"><br><br>

        <input type="submit" value="Envoyer">
    </form>

    <p id="reponse" style="color:green; font-weight:bold;"></p>

    </div>
</template>

<style scoped>

</style>