<script setup lang="ts">
    import MainLayout from '@/Layouts/MainLayout.vue';
    import { ref, computed } from 'vue';
    import { quizQuestions, shuffleArray, type QuizQuestion } from '@/data/quizData';

    // Images des tortues
    import imgVerte from '@/assets/quiz/tortue_verte.png';
    import imgImbriquee from '@/assets/quiz/tortue_imbriquee.png';
    import imgLuth from '@/assets/quiz/tortue_luth.png';
    import imgOlivatre from '@/assets/quiz/tortue_olivatre.png';
    import imgCaouanne from '@/assets/quiz/tortue_caouanne.png';

    const speciesImages: Record<string, string> = {
        'tortue_verte.png': imgVerte,
        'tortue_imbriquee.png': imgImbriquee,
        'tortue_luth.png': imgLuth,
        'tortue_olivatre.png': imgOlivatre,
        'tortue_caouanne.png': imgCaouanne,
    }

    function getSpeciesImage(imageFile: string): string {
        return speciesImages[imageFile] || imgVerte
    }

    // ─── État du quiz ────────────────────────────────────────────────────────

    type QuizState = 'idle' | 'question' | 'answered' | 'finished'

    const state = ref<QuizState>('idle')
    const questions = ref<QuizQuestion[]>([])
    const currentIndex = ref(0)
    const score = ref(0)
    const lastAnswerCorrect = ref(false)
    const showSpeciesInfo = ref(false)

    // Swipe card
    const cardTransform = ref('')
    const startX = ref(0)
    const isDragging = ref(false)

    const currentQuestion = computed(() => questions.value[currentIndex.value])
    const progress = computed(() => ((currentIndex.value + 1) / questions.value.length) * 100)
    const totalQuestions = computed(() => questions.value.length)

    const finalMessage = computed(() => {
        const s = score.value
        if (s >= 1100) return { emoji: '🏆', title: 'Expert Chélonien !', text: 'Impressionnant ! Vous connaissez les tortues marines sur le bout des nageoires.' }
        if (s >= 600) return { emoji: '🐢', title: 'Observateur Confirmé', text: 'Bon travail ! Vous avez de solides connaissances sur les tortues.' }
        return { emoji: '🐣', title: 'Apprenti Observateur', text: 'Continuez à apprendre ! Chaque observation compte pour la protection des tortues.' }
    })


    // ─── Actions ─────────────────────────────────────────────────────────────

    function startQuiz() {
        questions.value = shuffleArray(quizQuestions)
        currentIndex.value = 0
        score.value = 0
        showSpeciesInfo.value = false
        state.value = 'question'
    }

    function answer(userAnswer: boolean) {
        if (state.value !== 'question') return

        const isCorrect = userAnswer === currentQuestion.value.isTrue
        lastAnswerCorrect.value = isCorrect

        if (isCorrect) {
            score.value += 100
        }

        state.value = 'answered'
    }

    function nextQuestion() {
        showSpeciesInfo.value = false

        if (currentIndex.value + 1 >= questions.value.length) {
            state.value = 'finished'
            return
        }

        currentIndex.value++
        cardTransform.value = ''
        state.value = 'question'
    }

    function toggleSpeciesInfo() {
        showSpeciesInfo.value = !showSpeciesInfo.value
    }


    // ─── Swipe Gestures ──────────────────────────────────────────────────────

    function swipeAnimate(direction: 'left' | 'right') {
        if (state.value !== 'question') return
        
        const isTrue = direction === 'right'
        
        if (direction === 'left') {
            cardTransform.value = 'translateX(-150%) rotate(-30deg)'
        } else {
            cardTransform.value = 'translateX(150%) rotate(30deg)'
        }

        setTimeout(() => {
            answer(isTrue)
            cardTransform.value = ''
        }, 350)
    }

    function onTouchStart(e: TouchEvent) {
        if (state.value !== 'question') return
        startX.value = e.touches[0].clientX
        isDragging.value = true
    }

    function onTouchMove(e: TouchEvent) {
        if (!isDragging.value) return
        const moveX = e.touches[0].clientX - startX.value
        const rotation = moveX / 12
        cardTransform.value = `translateX(${moveX}px) rotate(${rotation}deg)`
    }

    function onTouchEnd(e: TouchEvent) {
        if (!isDragging.value) return
        isDragging.value = false
        const moveX = e.changedTouches[0].clientX - startX.value
        if (Math.abs(moveX) > 100) {
            swipeAnimate(moveX > 0 ? 'right' : 'left')
        } else {
            cardTransform.value = ''
        }
    }

    function onMouseDown(e: MouseEvent) {
        if (state.value !== 'question') return
        startX.value = e.clientX
        isDragging.value = true

        const moveHandler = (moveEvent: MouseEvent) => {
            if (!isDragging.value) return
            const moveX = moveEvent.clientX - startX.value
            const rotation = moveX / 12
            cardTransform.value = `translateX(${moveX}px) rotate(${rotation}deg)`
        }

        const upHandler = (upEvent: MouseEvent) => {
            isDragging.value = false
            const moveX = upEvent.clientX - startX.value
            if (Math.abs(moveX) > 100) {
                swipeAnimate(moveX > 0 ? 'right' : 'left')
            } else {
                cardTransform.value = ''
            }
            window.removeEventListener('mousemove', moveHandler)
            window.removeEventListener('mouseup', upHandler)
        }

        window.addEventListener('mousemove', moveHandler)
        window.addEventListener('mouseup', upHandler)
    }
</script>

<template>
    <MainLayout>
        <main class="Quiz centeredX">

            <!-- ═══════════ ÉCRAN DE DÉMARRAGE ═══════════ -->
            <div v-if="state === 'idle'" class="quiz-start">
                <div class="start-icon">🐢</div>
                <h1>Quiz Chéloniens</h1>
                <p class="start-subtitle">Testez vos connaissances sur les tortues marines de Martinique !</p>
                <div class="start-info">
                    <div class="info-item">
                        <span class="info-number">15</span>
                        <span class="info-label">Questions</span>
                    </div>
                    <div class="info-divider"></div>
                    <div class="info-item">
                        <span class="info-number">V/F</span>
                        <span class="info-label">Vrai ou Faux</span>
                    </div>
                    <div class="info-divider"></div>
                    <div class="info-item">
                        <span class="info-number">100</span>
                        <span class="info-label">pts / bonne réponse</span>
                    </div>
                </div>
                <button class="cta-btn" @click="startQuiz">Commencer le Quiz</button>
            </div>


            <!-- ═══════════ QUIZ EN COURS ═══════════ -->
            <template v-if="state === 'question' || state === 'answered'">
                
                <!-- Barre de progression -->
                <div class="progress-section">
                    <div class="progress-header">
                        <span class="progress-label">Score : <strong>{{ score }} pts</strong></span>
                        <span class="progress-count">Question {{ currentIndex + 1 }}/{{ totalQuestions }}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                    </div>
                </div>

                <!-- Carte de Question (Swipe) -->
                <div class="card-stack" v-if="state === 'question'">
                    <!-- Cartes fantômes en arrière-plan -->
                    <div class="ghost-card ghost-1"></div>
                    <div class="ghost-card ghost-2"></div>

                    <!-- Carte principale -->
                    <div 
                        class="swipe-card"
                        :style="{ transform: cardTransform }"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                        @touchend="onTouchEnd"
                        @mousedown="onMouseDown"
                    >
                        <div class="card-image-area">
                            <img 
                                :src="getSpeciesImage(currentQuestion.species.imageFile)" 
                                :alt="currentQuestion.species.name"
                                class="card-image"
                            />
                            <div class="card-overlay">
                                <p class="card-species-name">{{ currentQuestion.species.name }}</p>
                                <h2 class="card-statement">{{ currentQuestion.statement }}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Boutons Vrai / Faux -->
                <div class="action-buttons" v-if="state === 'question'">
                    <button class="action-btn btn-false" @click="swipeAnimate('left')">
                        <span class="btn-icon">✕</span>
                        <span class="btn-label">FAUX</span>
                    </button>
                    <button class="action-btn btn-true" @click="swipeAnimate('right')">
                        <span class="btn-icon">✓</span>
                        <span class="btn-label">VRAI</span>
                    </button>
                </div>

                <!-- ═══════════ FEEDBACK APRÈS RÉPONSE ═══════════ -->
                <div v-if="state === 'answered'" class="feedback-section" :class="{ correct: lastAnswerCorrect, wrong: !lastAnswerCorrect }">
                    <div class="feedback-header">
                        <span class="feedback-icon">{{ lastAnswerCorrect ? '✅' : '❌' }}</span>
                        <h2 class="feedback-title">{{ lastAnswerCorrect ? 'Bonne réponse !' : 'Mauvaise réponse' }}</h2>
                        <span class="feedback-points" v-if="lastAnswerCorrect">+100 pts</span>
                    </div>

                    <p class="feedback-explanation">{{ currentQuestion.explanation }}</p>

                    <!-- Bouton pour voir la fiche espèce -->
                    <button class="info-toggle-btn" @click="toggleSpeciesInfo">
                        {{ showSpeciesInfo ? 'Masquer' : 'Voir' }} la fiche de l'espèce
                        <span class="toggle-arrow" :class="{ open: showSpeciesInfo }">▼</span>
                    </button>

                    <!-- Fiche d'information de l'espèce -->
                    <Transition name="slideDown">
                        <div v-if="showSpeciesInfo" class="species-card">
                            <div class="species-card-header">
                                <img 
                                    :src="getSpeciesImage(currentQuestion.species.imageFile)" 
                                    :alt="currentQuestion.species.name"
                                    class="species-thumb"
                                />
                                <div>
                                    <h3 class="species-name">{{ currentQuestion.species.name }}</h3>
                                    <p class="species-scientific"><em>{{ currentQuestion.species.scientificName }}</em></p>
                                    <span class="species-status" :style="{ backgroundColor: currentQuestion.species.statusColor }">
                                        {{ currentQuestion.species.status }}
                                    </span>
                                </div>
                            </div>
                            <div class="species-details">
                                <div class="detail-row">
                                    <span class="detail-label">📏 Taille</span>
                                    <span class="detail-value">{{ currentQuestion.species.size }}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">⚖️ Poids</span>
                                    <span class="detail-value">{{ currentQuestion.species.weight }}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">🍽️ Régime</span>
                                    <span class="detail-value">{{ currentQuestion.species.diet }}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">🏝️ Habitat</span>
                                    <span class="detail-value">{{ currentQuestion.species.habitat }}</span>
                                </div>
                                <div class="detail-row fun-fact">
                                    <span class="detail-label">💡 Le saviez-vous ?</span>
                                    <span class="detail-value">{{ currentQuestion.species.funFact }}</span>
                                </div>
                            </div>
                        </div>
                    </Transition>

                    <button class="cta-btn next-btn" @click="nextQuestion">
                        {{ currentIndex + 1 < totalQuestions ? 'Question suivante →' : 'Voir les résultats →' }}
                    </button>
                </div>
            </template>


            <!-- ═══════════ ÉCRAN DE FIN ═══════════ -->
            <div v-if="state === 'finished'" class="quiz-end">
                <div class="end-emoji">{{ finalMessage.emoji }}</div>
                <h1 class="end-title">{{ finalMessage.title }}</h1>
                <p class="end-text">{{ finalMessage.text }}</p>
                
                <div class="score-display">
                    <span class="score-number">{{ score }}</span>
                    <span class="score-total">/ {{ totalQuestions * 100 }} pts</span>
                </div>

                <div class="score-bar-container">
                    <div class="score-bar-fill" :style="{ width: (score / (totalQuestions * 100)) * 100 + '%' }"></div>
                </div>

                <div class="end-stats">
                    <div class="stat-item correct-stat">
                        <span class="stat-number">{{ score / 100 }}</span>
                        <span class="stat-label">Bonnes réponses</span>
                    </div>
                    <div class="stat-item wrong-stat">
                        <span class="stat-number">{{ totalQuestions - (score / 100) }}</span>
                        <span class="stat-label">Mauvaises réponses</span>
                    </div>
                </div>

                <button class="cta-btn" @click="startQuiz">Recommencer le Quiz</button>
                <RouterLink class="back-link" to="/">← Retour à l'accueil</RouterLink>
            </div>

        </main>
    </MainLayout>
</template>

<style scoped>
    .Quiz {
        width: 100%;
        max-width: 500px;
        padding: 20px;
        padding-bottom: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        animation: fadeIn 0.5s ease forwards;
    }

    /* ═══════════ ÉCRAN DE DÉMARRAGE ═══════════ */

    .quiz-start {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
        padding: 40px 20px;
    }

    .start-icon {
        font-size: 5rem;
        animation: bounce 2.5s infinite;
    }

    .quiz-start h1 {
        color: #2e7d32;
        font-size: 2rem;
        font-weight: 700;
    }

    .start-subtitle {
        color: var(--textSub1);
        font-size: 1.1rem;
        max-width: 350px;
    }

    .start-info {
        display: flex;
        align-items: center;
        gap: 20px;
        background-color: var(--bgTop1);
        padding: 20px 30px;
        border-radius: 16px;
        box-shadow: var(--shadow);
    }

    .info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .info-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2e7d32;
    }

    .info-label {
        font-size: 0.75rem;
        color: var(--textSub2);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .info-divider {
        width: 1px;
        height: 40px;
        background-color: var(--dividerColor);
    }

    /* ═══════════ BARRE DE PROGRESSION ═══════════ */

    .progress-section {
        width: 100%;
        margin-bottom: 10px;
    }

    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding: 0 4px;
    }

    .progress-label {
        font-size: 0.85rem;
        color: var(--textSub1);
    }

    .progress-label strong {
        color: #2e7d32;
    }

    .progress-count {
        font-size: 0.85rem;
        font-weight: 700;
        color: #2e7d32;
    }

    .progress-bar {
        width: 100%;
        height: 8px;
        background-color: var(--bgTop2);
        border-radius: 100px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #2e7d32, #4caf50);
        border-radius: 100px;
        transition: width 0.5s ease-out;
    }

    /* ═══════════ CARTE SWIPE ═══════════ */

    .card-stack {
        position: relative;
        width: 100%;
        aspect-ratio: 3 / 4;
        perspective: 1000px;
    }

    .ghost-card {
        position: absolute;
        inset: 0;
        border-radius: 20px;
        border: 1px solid var(--dividerColor);
    }

    .ghost-1 {
        background-color: var(--bgTop2);
        transform: translateY(8px) scale(0.95);
        opacity: 0.5;
    }

    .ghost-2 {
        background-color: var(--bgTop1);
        transform: translateY(4px) scale(0.97);
        opacity: 0.8;
    }

    .swipe-card {
        position: absolute;
        inset: 0;
        background-color: var(--bg);
        border-radius: 20px;
        box-shadow: var(--shadow2);
        overflow: hidden;
        cursor: grab;
        user-select: none;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        touch-action: none;
    }

    .swipe-card:active {
        cursor: grabbing;
    }

    .card-image-area {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.7s ease;
    }

    .swipe-card:hover .card-image {
        transform: scale(1.05);
    }

    .card-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
    }

    .card-species-name {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .card-statement {
        font-size: 1.15rem;
        font-weight: 700;
        color: white;
        line-height: 1.4;
    }

    /* ═══════════ BOUTONS D'ACTION ═══════════ */

    .action-buttons {
        display: flex;
        justify-content: center;
        gap: 40px;
        width: 100%;
        padding: 10px 0;
    }

    .action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        background: transparent;
        transition: transform 0.15s ease;
    }

    .action-btn:active {
        transform: scale(0.9);
    }

    .btn-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 900;
        transition: all 0.2s ease;
    }

    .btn-false .btn-icon {
        background-color: var(--bgTop1);
        color: #ff6052;
        border: 2px solid rgba(255, 96, 82, 0.3);
    }

    .btn-false:hover .btn-icon {
        background-color: rgba(255, 96, 82, 0.1);
    }

    .btn-true .btn-icon {
        width: 76px;
        height: 76px;
        background: linear-gradient(135deg, #2e7d32, #4caf50);
        color: white;
        box-shadow: 0 4px 15px rgba(46, 125, 50, 0.35);
        font-size: 2.2rem;
    }

    .btn-true:hover .btn-icon {
        box-shadow: 0 6px 20px rgba(46, 125, 50, 0.5);
        filter: brightness(1.1);
    }

    .btn-label {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .btn-false .btn-label {
        color: var(--textSub1);
    }

    .btn-true .btn-label {
        color: #2e7d32;
        font-weight: 800;
        letter-spacing: 1px;
    }

    /* ═══════════ FEEDBACK ═══════════ */

    .feedback-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        animation: fadeIn 0.4s ease forwards;
    }

    .feedback-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-radius: 16px;
    }

    .correct .feedback-header {
        background-color: rgba(46, 125, 50, 0.1);
        border: 2px solid rgba(46, 125, 50, 0.3);
    }

    .wrong .feedback-header {
        background-color: rgba(255, 96, 82, 0.08);
        border: 2px solid rgba(255, 96, 82, 0.3);
        animation: shakeX 0.5s ease;
    }

    .feedback-icon {
        font-size: 1.8rem;
    }

    .feedback-title {
        flex: 1;
        font-size: 1.2rem;
        font-weight: 700;
    }

    .correct .feedback-title {
        color: #2e7d32;
    }

    .wrong .feedback-title {
        color: #ff6052;
    }

    .feedback-points {
        font-size: 1rem;
        font-weight: 800;
        color: #2e7d32;
        background-color: rgba(46, 125, 50, 0.1);
        padding: 4px 12px;
        border-radius: 20px;
    }

    .feedback-explanation {
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--text);
        padding: 0 4px;
    }

    /* ═══════════ BOUTON FICHE ESPÈCE ═══════════ */

    .info-toggle-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 20px;
        background-color: var(--bgTop1);
        color: var(--textSub1);
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 12px;
        cursor: pointer;
    }

    .info-toggle-btn:hover {
        background-color: var(--bgTop2);
    }

    .toggle-arrow {
        font-size: 0.7rem;
        transition: transform 0.3s ease;
    }

    .toggle-arrow.open {
        transform: rotate(180deg);
    }

    /* ═══════════ FICHE ESPÈCE ═══════════ */

    .species-card {
        background-color: var(--bgTop1);
        border-radius: 16px;
        box-shadow: var(--shadow);
        overflow: hidden;
    }

    .species-card-header {
        display: flex;
        gap: 16px;
        padding: 16px;
        align-items: center;
    }

    .species-thumb {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        object-fit: cover;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .species-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text);
        margin-bottom: 2px;
    }

    .species-scientific {
        font-size: 0.8rem;
        color: var(--textSub2);
        margin-bottom: 8px;
    }

    .species-status {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        color: white;
        padding: 3px 10px;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
    }

    .species-details {
        padding: 0 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .detail-row {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .detail-label {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--textSub2);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .detail-value {
        font-size: 0.9rem;
        color: var(--text);
        line-height: 1.5;
    }

    .fun-fact .detail-value {
        font-style: italic;
        color: var(--textSub1);
    }

    /* ═══════════ ÉCRAN DE FIN ═══════════ */

    .quiz-end {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        text-align: center;
        padding: 40px 20px;
        animation: fadeIn 0.6s ease forwards;
    }

    .end-emoji {
        font-size: 5rem;
        animation: bounce 2s infinite;
    }

    .end-title {
        font-size: 2rem;
        font-weight: 700;
        color: #2e7d32;
    }

    .end-text {
        font-size: 1rem;
        color: var(--textSub1);
        max-width: 350px;
        line-height: 1.6;
    }

    .score-display {
        display: flex;
        align-items: baseline;
        gap: 6px;
        margin: 10px 0;
    }

    .score-number {
        font-size: 3.5rem;
        font-weight: 800;
        color: #2e7d32;
        line-height: 1;
    }

    .score-total {
        font-size: 1.2rem;
        color: var(--textSub2);
    }

    .score-bar-container {
        width: 100%;
        max-width: 300px;
        height: 10px;
        background-color: var(--bgTop2);
        border-radius: 100px;
        overflow: hidden;
    }

    .score-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #2e7d32, #4caf50);
        border-radius: 100px;
        transition: width 1.5s ease-out;
    }

    .end-stats {
        display: flex;
        gap: 30px;
        margin: 10px 0;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .stat-number {
        font-size: 2rem;
        font-weight: 700;
    }

    .correct-stat .stat-number {
        color: #2e7d32;
    }

    .wrong-stat .stat-number {
        color: #ff6052;
    }

    .stat-label {
        font-size: 0.75rem;
        color: var(--textSub2);
        text-transform: uppercase;
    }

    .back-link {
        font-size: 0.9rem;
        color: var(--link);
        margin-top: 10px;
    }

    /* ═══════════ CTA BUTTON (cohérent avec Home.vue) ═══════════ */

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
        cursor: pointer;
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

    .next-btn {
        align-self: center;
        margin-top: 10px;
    }

    /* ═══════════ TRANSITIONS ═══════════ */

    .slideDown-enter-active,
    .slideDown-leave-active {
        transition: all 0.4s ease;
    }

    .slideDown-enter-from,
    .slideDown-leave-to {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
    }

    .slideDown-enter-to,
    .slideDown-leave-from {
        opacity: 1;
        max-height: 800px;
    }

    /* ═══════════ ANIMATIONS ═══════════ */

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-15px); }
        60% { transform: translateY(-7px); }
    }

    @keyframes shakeX {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-6px); }
        20% { transform: translateX(6px); }
        30% { transform: translateX(-4px); }
        40% { transform: translateX(4px); }
        50% { transform: translateX(-2px); }
        60% { transform: translateX(2px); }
    }

    /* ═══════════ RESPONSIVE ═══════════ */

    @media (max-width: 768px) {
        .Quiz {
            padding: 15px;
            padding-bottom: 50px;
        }

        .quiz-start h1, .end-title {
            font-size: 1.6rem;
        }

        .start-info {
            padding: 15px 20px;
            gap: 15px;
        }

        .info-number {
            font-size: 1.2rem;
        }

        .card-statement {
            font-size: 1rem;
        }

        .btn-true .btn-icon {
            width: 64px;
            height: 64px;
            font-size: 1.8rem;
        }

        .score-number {
            font-size: 2.5rem;
        }
    }
</style>
