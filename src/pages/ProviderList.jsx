import { useEffect, useState } from "react";
import userService from "../features/user/userService";
import userServiceMock from "../features/user/userServiec.mock";
import ProviderCard from "../components/provider/provider.card";

import "../components/provider/provider.css";

function ProviderList() {
	const [providers, serProviders] = useState([]);
    const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getProviders = async () => {
			try {
				const response = await userService.getProviders(page, 6);
				serProviders(response);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		getProviders();
	}, [page]);

	const renderProviders = () => {
		return providers.data.map((provider) => {
			return <ProviderCard provider={provider} key={provider._id} />;
		});
	};

	return (
		<div className="provider-list">
			<h1>Provider List</h1>
			{isLoading ? (
				<div className="loadingSpinner" style={{
                    "margin": "50px auto",
                }}></div>
			) : (
				<>
					<div className="provider-list__content">
						{renderProviders()}
					</div>
					<div className="provider-list__fotter">
						<button className="btn btn-sm" style={{
                            "visibility": providers.pagination.prev ? "visible" : "hidden",
                        }}
                        onClick={()=>{
                            setPage(page - 1);
                        }}> {"<"} </button>
						<p>{page}</p>
						<button className="btn btn-sm" style={{
                            "visibility": providers.pagination.next ? "visible" : "hidden",
                        }}
                        onClick={()=>{
                            setPage(page + 1);
                        }}> {">"} </button>
					</div>
				</>
			)}
		</div>
	);
}

export default ProviderList;
