import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
	return (
		<>
			<section className="heading">
				<h1>A Car Booking System</h1>
				<p>Please choose from an option below</p>
			</section>
			<Link to="/providers" className="btn btn-block">
				<FaQuestionCircle /> Book a new car
			</Link>
			<Link to="/booking" className="btn btn-block">
				<FaTicketAlt /> View My Booking
			</Link>
		</>
	);
}

export default Home;