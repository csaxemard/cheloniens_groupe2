/**
 * Données du Quiz Chéloniens — Tortues marines de Martinique
 * 
 * Ce fichier contient les fiches d'espèces et les questions Vrai/Faux
 * utilisées par le composant Quiz.vue.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SpeciesInfo {
    name: string
    scientificName: string
    size: string
    weight: string
    diet: string
    status: string
    statusColor: string
    habitat: string
    funFact: string
    imageFile: string
}

export interface QuizQuestion {
    id: number
    statement: string
    isTrue: boolean
    explanation: string
    species: SpeciesInfo
}


// ─── Fiches d'espèces ───────────────────────────────────────────────────────

export const speciesList: SpeciesInfo[] = [
    {
        name: "Tortue Verte",
        scientificName: "Chelonia mydas",
        size: "80 à 130 cm",
        weight: "130 à 230 kg",
        diet: "Herbivore — Se nourrit principalement d'algues et d'herbes marines (phanérogames).",
        status: "En danger (EN)",
        statusColor: "#e65100",
        habitat: "Eaux côtières peu profondes, herbiers marins et récifs coralliens de Martinique.",
        funFact: "C'est la seule tortue marine herbivore à l'âge adulte. Sa graisse est verte à cause de son alimentation végétale, d'où son nom !",
        imageFile: "tortue_verte.png"
    },
    {
        name: "Tortue Imbriquée",
        scientificName: "Eretmochelys imbricata",
        size: "60 à 90 cm",
        weight: "45 à 75 kg",
        diet: "Se nourrit principalement d'éponges de mer, mais aussi d'anémones et de méduses.",
        status: "En danger critique (CR)",
        statusColor: "#b71c1c",
        habitat: "Récifs coralliens, zones rocheuses et mangroves de Martinique.",
        funFact: "Ses écailles en forme de tuiles superposées (imbriquées) étaient autrefois utilisées pour fabriquer des objets d'art et des bijoux, ce qui a fortement contribué à sa raréfaction.",
        imageFile: "tortue_imbriquee.png"
    },
    {
        name: "Tortue Luth",
        scientificName: "Dermochelys coriacea",
        size: "130 à 175 cm",
        weight: "250 à 700 kg",
        diet: "Se nourrit presque exclusivement de méduses et d'organismes gélatineux.",
        status: "Vulnérable (VU)",
        statusColor: "#f57f17",
        habitat: "Eaux pélagiques (haute mer). Vient pondre sur les plages de Martinique entre mars et août.",
        funFact: "C'est la plus grande tortue marine au monde et le reptile le plus lourd vivant. Sa carapace n'est pas une coquille dure, mais une peau épaisse et souple renforcée d'osselets.",
        imageFile: "tortue_luth.png"
    },
    {
        name: "Tortue Olivâtre",
        scientificName: "Lepidochelys olivacea",
        size: "55 à 75 cm",
        weight: "35 à 50 kg",
        diet: "Omnivore — Crustacés, mollusques, méduses, algues et poissons.",
        status: "Vulnérable (VU)",
        statusColor: "#f57f17",
        habitat: "Eaux tropicales et subtropicales. Observation rare en Martinique, principalement en pleine mer.",
        funFact: "C'est la plus petite et la plus abondante des tortues marines au monde. Elle est connue pour ses pontes massives et synchronisées appelées « arribadas », où des milliers de femelles viennent pondre en même temps.",
        imageFile: "tortue_olivatre.png"
    },
    {
        name: "Tortue Caouanne",
        scientificName: "Caretta caretta",
        size: "70 à 110 cm",
        weight: "80 à 200 kg",
        diet: "Carnivore — Crustacés, mollusques, oursins et poissons à carapace dure.",
        status: "Vulnérable (VU)",
        statusColor: "#f57f17",
        habitat: "Eaux tempérées et tropicales. Observée occasionnellement en Martinique lors de ses migrations.",
        funFact: "Son nom « Caouanne » vient du créole. Elle possède la mâchoire la plus puissante de toutes les tortues marines, capable de broyer des coquillages et des oursins.",
        imageFile: "tortue_caouanne.png"
    }
]


// ─── Banque de 15 questions Vrai/Faux ────────────────────────────────────────

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        statement: "La Tortue Verte est herbivore à l'âge adulte.",
        isTrue: true,
        explanation: "Correct ! La Tortue Verte est la seule tortue marine herbivore à l'âge adulte. Elle se nourrit d'algues et d'herbes marines.",
        species: speciesList[0]
    },
    {
        id: 2,
        statement: "La Tortue Luth possède une carapace dure comme les autres tortues marines.",
        isTrue: false,
        explanation: "Faux ! La Tortue Luth a une carapace souple, recouverte d'une peau épaisse et coriace renforcée d'osselets, et non d'écailles dures.",
        species: speciesList[2]
    },
    {
        id: 3,
        statement: "La Tortue Imbriquée est classée « En danger critique d'extinction » par l'UICN.",
        isTrue: true,
        explanation: "Correct ! C'est l'espèce de tortue marine la plus menacée au monde, principalement à cause du commerce de ses écailles.",
        species: speciesList[1]
    },
    {
        id: 4,
        statement: "La Tortue Olivâtre est la plus grande espèce de tortue marine au monde.",
        isTrue: false,
        explanation: "Faux ! C'est la plus petite (55-75 cm). La plus grande est la Tortue Luth qui peut atteindre 175 cm et peser jusqu'à 700 kg.",
        species: speciesList[3]
    },
    {
        id: 5,
        statement: "La Tortue Caouanne possède la mâchoire la plus puissante de toutes les tortues marines.",
        isTrue: true,
        explanation: "Correct ! Sa mâchoire robuste lui permet de broyer facilement des coquillages, des crustacés et des oursins.",
        species: speciesList[4]
    },
    {
        id: 6,
        statement: "La Tortue Verte doit son nom à la couleur verte de sa carapace.",
        isTrue: false,
        explanation: "Faux ! Son nom vient de la couleur verte de sa graisse, due à son alimentation à base d'algues et d'herbes marines.",
        species: speciesList[0]
    },
    {
        id: 7,
        statement: "La Tortue Luth se nourrit principalement de méduses.",
        isTrue: true,
        explanation: "Correct ! La Tortue Luth est spécialisée dans la consommation de méduses et d'organismes gélatineux, jouant un rôle crucial dans la régulation des populations de méduses.",
        species: speciesList[2]
    },
    {
        id: 8,
        statement: "Les écailles de la Tortue Imbriquée sont disposées côte à côte, sans se chevaucher.",
        isTrue: false,
        explanation: "Faux ! Les écailles de la Tortue Imbriquée se superposent comme des tuiles de toit (elles sont « imbriquées »), c'est ce qui lui donne son nom.",
        species: speciesList[1]
    },
    {
        id: 9,
        statement: "La Tortue Olivâtre est connue pour ses pontes massives synchronisées appelées « arribadas ».",
        isTrue: true,
        explanation: "Correct ! Lors des « arribadas », des milliers de femelles viennent pondre simultanément sur la même plage, un phénomène spectaculaire unique à cette espèce.",
        species: speciesList[3]
    },
    {
        id: 10,
        statement: "La Tortue Caouanne est strictement herbivore.",
        isTrue: false,
        explanation: "Faux ! La Tortue Caouanne est principalement carnivore. Elle se nourrit de crustacés, de mollusques, d'oursins et de poissons.",
        species: speciesList[4]
    },
    {
        id: 11,
        statement: "La Tortue Luth peut peser jusqu'à 700 kg.",
        isTrue: true,
        explanation: "Correct ! La Tortue Luth est le reptile le plus lourd encore vivant, pouvant atteindre 700 kg et mesurer jusqu'à 175 cm de carapace.",
        species: speciesList[2]
    },
    {
        id: 12,
        statement: "La Tortue Imbriquée se nourrit principalement de poissons et de crustacés.",
        isTrue: false,
        explanation: "Faux ! La Tortue Imbriquée se nourrit principalement d'éponges de mer, qu'elle extrait des récifs grâce à son bec pointu caractéristique.",
        species: speciesList[1]
    },
    {
        id: 13,
        statement: "La Tortue Verte fréquente les herbiers marins et les récifs coralliens de Martinique.",
        isTrue: true,
        explanation: "Correct ! La Tortue Verte est souvent observée dans les eaux côtières peu profondes, les herbiers de phanérogames et les récifs de Martinique.",
        species: speciesList[0]
    },
    {
        id: 14,
        statement: "Le nom « Caouanne » vient du latin signifiant « grosse tête ».",
        isTrue: false,
        explanation: "Faux ! Le nom « Caouanne » vient du créole. En revanche, son nom scientifique « Caretta » fait effectivement référence à sa tête imposante.",
        species: speciesList[4]
    },
    {
        id: 15,
        statement: "La Tortue Luth vient pondre sur les plages de Martinique entre mars et août.",
        isTrue: true,
        explanation: "Correct ! La saison de ponte de la Tortue Luth en Martinique s'étend de mars à août. C'est la période idéale pour observer les femelles venir pondre sur les plages.",
        species: speciesList[2]
    }
]


/**
 * Mélange aléatoire d'un tableau (algorithme de Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}
