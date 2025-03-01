import { defineStore } from "pinia";
export const useTemplateStore = defineStore('templates', {
    state: () => ({ mobileSideIsOpen: false })
})