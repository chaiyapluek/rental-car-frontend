import { useEffect, useState } from "react";
import userServiceMock from "../features/user/userServiec.mock";
import userService from "../features/user/userService";
import ProviderCardFull from "../components/provider/provider.card.full";
import { useParams } from "react-router-dom";

function Provider() {
	const [provider, setProvider] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const getProvider = async () => {
			try {
				const response = await userService.getProvider(id);
				setProvider(response);
				setIsLoading(false);
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
				<div className="provider-card-full">
					<ProviderCardFull provider={provider.data} />
				</div>
			) : (
				<div>
					{isLoading ? (
						<div className="loadingSpinner" style={
							{
								"margin": "50px auto",
								"alignItems": "center",
							}
						}></div>
					) : (
						<h1>Provider not found</h1>
					)}
				</div>
			)}
		</>
	);
}

export default Provider;
