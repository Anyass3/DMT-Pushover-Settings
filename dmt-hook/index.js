import onConnect from './onConnect.js';

import { makeApi } from './state.js';

export default function initProtocol({ program }) {
	const api = makeApi();
	const protocol = 'pushoversettings';
	
	program.dev('dmtapp').registerProtocol(protocol, ({ channel }) => {
		onConnect({ channel, api });
	});
}

function init(program) {
	initProtocol({ program });
}

export { init };
