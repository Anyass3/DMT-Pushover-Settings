import { getEvent, getLocalDateTime, createSnackStore } from './utils';
export default {
	noStore: ['base_url', 'snackbar'],
	state: {
		base_url: import.meta.env.BASE_URL.replace('_app/', ''),
		snackbar: createSnackStore(),
		pushover: { app: [] }
	},
	mutations: {
		snackbar(state, message, timeout) {
			state.snackbar.show(message, timeout);
		},
		updating(state, _app) {
			let key = ''
			const app = state.pushover.get().app.find(app => {
				key = (app.id == _app?.id && 'token') || (app.token == _app?.token && 'id') || '';
				return !!key
			})
			return key ? { key, app:{...app}, noDiff: (app.id == _app?.id) && (app.token == _app?.token) } : undefined
		}
	},
	actions: {
	}
};
