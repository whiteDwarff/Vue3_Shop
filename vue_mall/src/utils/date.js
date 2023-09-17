import { ref } from 'vue';

const date = new Date();
const year = date.getFullYear(); // 연도
const month = date.getMonth(); // 월
const day = date.getDate(); // 일
const hours = date.getHours(); // 시간
const minutes = date.getMinutes(); // 분
const seconds = date.getSeconds(); // 초

const currentDate = ref(
	`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
);

export default currentDate;
