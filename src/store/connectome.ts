import { browser } from '$app/environment';
import { connect } from 'connectome';
// import { port } from './getAPi';

export default {
	noStore: true,
	state: {
		connector: null,
		serverStore: null,
		serverApi: null,
		connected: null
	},
	actions: {
		startConnectome: ({ commit, state, dispatch }) => {
			if (!browser && state.connector) return;

			const protocol = 'dmtapp/pushoversettings';
			const connector = connect({ protocol, port: 7780 });
			//   const { state: store, connected } = connector;

			// console.log('store', store);
			// commit('serverStore', store);
			connector.on('ready', () => {
				connector.signal('get events');
			});
			commit('connector', connector);
			commit('connected', connector.connected);
			// store.subscribe((state) => {
			// 	commit('events', state.events);
			// 	console.log(state);
			// });
			connector.on('pushover', (pushover) => {
				dispatch('pushover', pushover);
			});

			connector.on('notify-success', (msg) => {
				dispatch('snackbar', msg);
			});
			connector.on('notify-danger', (msg) => {
				dispatch('snackbar', msg);
			});
		}
	}
};
