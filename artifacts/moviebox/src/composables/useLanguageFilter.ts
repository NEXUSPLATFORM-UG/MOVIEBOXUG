import { ref } from "vue";

const activeLang = ref("en");

export function useLanguageFilter() {
  function setLanguage(code: string) {
    activeLang.value = code;
  }
  return { activeLang, setLanguage };
}
