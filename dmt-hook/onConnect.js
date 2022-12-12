function handleEvents({ channel, api }) {
	const timeoutId = setInterval(() => {
		channel.signal('pushover', api.getPushOverApps());
	}, 5000);

	channel.on('set-pushover-app', ({ app, update }) => {
		try {
			const message = api.setPushoverApp(app, update);
			channel.signal('notify-success', message);
		} catch (error) {
			channel.signal('notify-danger', error.message);
		}
		channel.signal('pushover', api.getPushOverApps());
	});

	channel.on('disconnect', () => {
		clearInterval(timeoutId);
		// api.notify('events disconnected');
	});
}

export default handleEvents;
