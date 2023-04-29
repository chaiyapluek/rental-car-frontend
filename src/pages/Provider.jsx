import { useEffect, useState } from "react";
import userServiceMock from "../features/user/userServiec.mock";
import ProviderCardFull from "../components/provider/provider.card.full";
import { useParams } from "react-router-dom";

function Provider() {
	const [provider, setProvider] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const getProvider = async () => {
			try {
				const response = await userServiceMock.getProvider(id);
				setProvider(response);
			} catch (error) {
				console.log(error);
				setProvider(null);
			}
		};

		getProvider();
	}, []);

	return (
		<>
			{provider ? (
				<div>
					<ProviderCardFull provider={provider} />
				</div>
			) : (
				<div>
					{isLoading ? (
						<h1>Loading...</h1>
					) : (
						<h1>Provider not found</h1>
					)}
				</div>
			)}
		</>
	);
}

export default Provider;
