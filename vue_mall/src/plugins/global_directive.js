import focus from '@/directives/focus.js';

export default {
	install(app) {
		app.directive('focus', focus);
	},
};
