/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#11181C",
        background: "#fff",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ffffff",
        textSecondary: "#dedede",
        textTertiary: "#5ac7fa",
        background: "#000000",
        secondaryBackground: "#0f0f10",
        tertiaryBackground: "#2e2e2e",
        tint: tintColorDark,
        secondary: "#2bc7ff",
        tabIconDefault: "#2bc7ff",
        tabIconSelected: tintColorDark,
    },
};
