/**
 * Runs synchronously in <head> before first paint. It writes three things:
 *
 *   - the `dark` class, which every colour token keys off (see globals.css),
 *     and which is also what draws the light switch, so that control is
 *     correct on the very first frame rather than one React render later
 *   - `data-theme`, the *stored preference* (system | light | dark), which
 *     records whether the operating system is still being followed
 *   - the `js` class, which is what gates the opening curtain. With scripting
 *     off the curtain is never displayed, so it can never trap the page.
 */
export const THEME_STORAGE_KEY = "theme";

export type ThemePreference = "system" | "light" | "dark";

export const themeScript = `(function(){try{
var e=document.documentElement;
e.classList.add('js');
var s=localStorage.getItem('${THEME_STORAGE_KEY}');
var d=s==='dark'||(s!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);
e.classList.toggle('dark',d);
e.style.colorScheme=d?'dark':'light';
e.dataset.theme=(s==='dark'||s==='light')?s:'system';
}catch(e){}})();`;
