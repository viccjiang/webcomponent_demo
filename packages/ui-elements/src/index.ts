import { defineCustomElement } from 'vue';
import MyButton from './components/MyButton.ce.vue';

export const MyButtonElement = defineCustomElement(MyButton);

export { register } from './register';
