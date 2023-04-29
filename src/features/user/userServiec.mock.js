import providers from "../../data/providers";

const getProviders = async () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(providers);
		}, 500);
	});
};

const getProvider = async (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const provider = providers.find((provider) => provider._id === id);
			if (provider) {
				resolve(provider);
			} else {
				reject(new Error("provider not found"));
			}
		}, 500);
	});
};

const getBookings = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([]);
        }, 500);
    });
};

const userServiceMock = {
	getProviders,
	getProvider,
	getBookings,
};

export default userServiceMock;
