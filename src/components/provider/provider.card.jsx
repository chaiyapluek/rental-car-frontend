import { useNavigate } from "react-router-dom";
import ProviderImage from "./provider.image";

function ProviderCard({ provider }) {

	const navigate = useNavigate();

	const viewDetail = () => {
		console.log("view detail");
		navigate(`/providers/${provider._id}`);
	};

	return (
		<div className="provider-card">
			<img src={provider.pic} alt="provider pic"/>
			<div className="provider-card__content">
				<h3>{provider.name}</h3>
				<p>Tel: {provider.tel}</p>
				<p>Address: {provider.address}</p>
            </div>
			<button className="btn" onClick={viewDetail}>view detail</button>
		</div>
	);
}

export default ProviderCard;
