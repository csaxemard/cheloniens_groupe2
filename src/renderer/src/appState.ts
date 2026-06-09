interface AppState {
    appTitle: string,
    cssThemeVariables: Record<string, string[]>,
    theme: "light" | "dark",
    currentUser: null | {username: string, email: string},
}



export function initCssThemeVariables() {
    const style = document.createElement("style")

    let light = ".App {\n"
    let dark = ".App.dark {\n"

    Object.entries(appState.cssThemeVariables).forEach(([key, themeProperties]) => {
        light += `--${key}: ${themeProperties[0]};\n`
        dark += `--${key}: ${themeProperties[1] || themeProperties[0]};\n`
    });

    light += "}";
    dark += "}";

    style.textContent = "/* [Dev note] Style generated from appState.js */\n" + light + "\n" + dark
    style.id = "css-theme-variables"
    style.dataset.devNote = "Style generated from appState.js"
    document.head.appendChild(style)
}



const appState: AppState = {
    appTitle: "Cheloniens en Martinique",

    cssThemeVariables: {
        // cssVarName: ["valueLight", "valueDark", "maybe3rdTheme?"]
        // Si dark n'a pas de valeur, il prend la valeur de light comme fallback

        /* Bg, aplats */
        bg: ["#fff", "#3e3e3e"],
        bgTop1: ["#f0f0f0", "#505050"],
        bgTop2: ["#e0e0e0", "#606060"],
        bgTop3: ["#f0f0f0", "#707070"],
        bgTop1Colored: ["#ecf2fc", "#4b5056"],
        bgSub1: ["#ffffff", "#2f2f2f"],

        /* Effects */
        boxBorder: ["transparent", "var(--dividerColor)"],
        dividerColor: ["#5454547a", "#6a6a6a"],
        divider: ["1px solid var(--dividerColor)"],
        shadow: ["rgba(0, 0, 0, .1) 0 2px 4px 0", ""],
        shadow2: ["0 12px 32px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .08)", ""],
        shadowUniform: ["#bebebe 0 0 5px 0", "#353535 0 0 5px 0"],

        /* Accents */
        emph: ["#ff6052", "#ff7e72"],
        emph2: ["#ffa632", ""],
        emph3: ["#008000", ""],

        /* Text default */
        text: ["black", "white"],
        textSub1: ["#5f5f5f", "#c0c0c0"],
        textSub2: ["#707070", "#909090"],
        textOpposite: ["white", "black"],
        link: ["#0b57d0", "#9bc2ff"],

        /* Button default */
        btnBg: ["var(--bgTop1)", "var(--bgTop1)"],
        btnBgHover: ["#ecf2fc", "var(--bgTop2)"],
        btnBgActive: ["#bdd6ff", "#9b9b9b"],
    },

    theme: "dark",

    currentUser: null
};

export default appState