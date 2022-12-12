import fs from 'fs';
import path from 'path';
import { push } from 'dmt/notify';

import { def2json, json2def } from 'dmt-defjson';

import { dmtUserDir, log } from 'dmt/common';

const pushoverDefPath = path.join(dmtUserDir, 'def/pushover.def');

export const makeApi = () => {
	return {
		notify(msg) {
			push.notify(msg);
		},
		getPushOverApps() {
			const { pushover } = def2json(fs.readFileSync(pushoverDefPath, 'utf-8'));
			if (!Array.isArray(pushover.app)) pushover.app = [pushover.app];
			// log.red(JSON.stringify(pushover, undefined, 2));
			return pushover;
		},
		setPushoverApp(app, update) {
			const api = this;
			let message = 'Nothing changed in your pushover.def'
			// log.red(JSON.stringify(app));
			const pushover = api.getPushOverApps();
			log.red(pushover)
			log.gray({app,update})
			 if (update) {
				pushover.app.map((a) => {
					if (a.id === update.app.id) {
						a.id = app.id;
						a.token = app.token;
						if (update.key == 'id')
							message = `✨ Updated Pushover App name from ${update.app.id} to ${app.id}`;
						else
							message = `✨ Updated Pushover App (${app.id}) token/key from ${update.app.token} to ${app.token}`;
						api.notify(message)
					}
					return a;
				});

				const def = json2def({ pushover });

				fs.writeFileSync(pushoverDefPath, def);
			} else if (!pushover.app.find(({ id }) => app.id == id)) {
				pushover.app.push(app);
				const def = json2def({ pushover });

				message = `✨ Added a new pushover app: ${app.id}`;
				api.notify(message);
				// log.green(def);
				fs.writeFileSync(pushoverDefPath, def);
			}
			return message;
		}
	};
};
// 10 cola-nuts
// 5 
// 12 cola-nuts