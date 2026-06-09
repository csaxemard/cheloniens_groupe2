<script setup>
    import MainLayout from "@/Layouts/MainLayout.vue";
</script>

<template>
    <MainLayout>
        <main class="Home">
            <h1 class="title">Suivi des Chéloniens en Martinique</h1>
            
            <div class="image-container">
                <img src="@/assets/image1.jpg" class="turtle-image" alt="Photo de tortue marine">
            </div>
            
            <p class="emoji">🐢</p>
            
            <RouterLink class="cta-btn" to="/sawTurtle">Signaler une observation</RouterLink>
        </main>
    </MainLayout>
</template>

<style scoped>
    .Home {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        box-sizing: border-box;
        text-align: center;
    }

    .title {
        color: #2e7d32;
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: 0.5px;
    }

    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .turtle-image {
        width: 85%;
        max-width: 550px;
        height: auto;
        max-height: 45vh;
        object-fit: cover;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border: 4px solid var(--btnBgNavHoverColored);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .turtle-image:hover {
        transform: scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
    }

    .emoji {
        font-size: 3rem;
        margin: 0;
        animation: bounce 2.5s infinite;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }

    .cta-btn {
        display: inline-block;
        padding: 14px 35px;
        background-color: #2e7d32;
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(46, 125, 50, 0.25);
        transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
    }

    .cta-btn:hover {
        background-color: #1b5e20;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(27, 94, 32, 0.4);
    }

    .cta-btn:active {
        transform: translateY(1px);
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-15px);
        }
        60% {
            transform: translateY(-7px);
        }
    }

    @media (max-width: 768px) {
        .title {
            font-size: 1.8rem;
        }
        .turtle-image {
            width: 90%;
            max-height: 35vh;
        }
        .emoji {
            font-size: 2.5rem;
        }
        .cta-btn {
            font-size: 1rem;
            padding: 12px 25px;
        }
    }
</style>