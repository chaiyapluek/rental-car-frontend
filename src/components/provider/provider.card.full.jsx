import ProviderImage from "./provider.image";

function ProviderCardFull({ provider }) {
	const viewDetail = () => {
		console.log("book?");
	};

	return (
		<div>
			<ProviderImage images={provider.images}/>
			<h3>{provider.name}</h3>
			<p>{provider.tel}</p>
			<p>{provider.address}</p>
            <button className="btn" onClick={viewDetail}>Book now</button>
		</div>
	);
}

export default ProviderCardFull;
