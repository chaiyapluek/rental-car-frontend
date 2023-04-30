import ProviderImage from "./provider.image";
import ProviderForm from "./provider.form";

function ProviderCardFull({ provider }) {
	const viewDetail = () => {
		console.log("book?");
	};

	return (
		<>
			<ProviderImage images={provider.images}/>
			<ProviderForm provider={provider}/>
		</>
	);
}

export default ProviderCardFull;
