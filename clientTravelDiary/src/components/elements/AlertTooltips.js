import React from "react";
import { Toast } from "react-bootstrap";

function AlertTooltips(props) {
	return (
		<Toast
			style={{
				position: "fixed",
				bottom: "50px",
				right: "50px",
				zIndex: "999",
			}}
			show={props.show}
			onClose={props.onClose}
			delay={1000}
			autohide
			bg={props.bg}
			className="text-white text-center"
		>
			{/* <Toast.Header> 
				<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
				<strong className="me-auto">Bootstrap</strong>
				<small>11 mins ago</small>
			</Toast.Header> */}
			<Toast.Body>{props.text}</Toast.Body>
		</Toast>
	);
}

export default AlertTooltips;
