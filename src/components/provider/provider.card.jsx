import { useNavigate } from "react-router-dom";
import ProviderImage from "./provider.image";

function ProviderCard({ provider }) {

	const navigate = useNavigate();

	const viewDetail = () => {
		console.log("view detail");
		navigate(`/providers/${provider._id}`);
	};

	return (
		<div>
			<ProviderImage images={provider.images}/>
			<h3>{provider.name}</h3>
			<p>{provider.tel}</p>
			<p>{provider.address}</p>
            <button className="btn" onClick={viewDetail}>view detail</button>
		</div>
	);
}

export default ProviderCard;
