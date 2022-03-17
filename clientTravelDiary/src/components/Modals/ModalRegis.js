import React, { useContext, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { API } from "../../configAPI/api";
import Swal from "sweetalert2";

function ModalRegis(props) {
	const navigate = useNavigate();

	const title = "Register";
	document.title = "The Journey | " + title;

	const [state, dispatch] = useContext(UserContext);
	const [message, setMessage] = useState(null);

	const [form, setForm] = useState({
		fullname: "",
		email: "",
		password: "",
		phone: "",
		address: "",
	});

	const { fullname, email, password, phone, address } = form;

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegister = async (e) => {
		try {
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const body = JSON.stringify(form);

			const response = await API.post("/register", body, config);
			console.log(response.data.data);

			const alert = <Alert variant="success">{response.data.status}</Alert>;

			setMessage(alert);
			if (response?.status === 201) {
				if (response.data.status === "success") {
					dispatch({
						type: "USER_SUCCESS",
						payload: response.data.data.user,
					});
					Swal.fire({
						title: "Wellcome!",
						text: response.data.data.user.fullname,
						icon: "success",
					});
				}
				navigate("/");
			}
		} catch (error) {
			if (error) {
				const alert = <Alert variant="danger">Account is Already</Alert>;

				setMessage(alert);
			}

			const alert = (
				<Alert variant="danger">{error.response.data.error.message}</Alert>
			);

			setMessage(alert);
		}
	};

	return (
		<Modal show={props.show} onHide={props.onHide} centered>
			<div className="position-relative">
				<img
					src="../assets/atlas1.png"
					alt="atlas"
					className="position-absolute top-0 start-0"
				/>
				<img
					src="../assets/leaf1.png"
					alt="leaf"
					className="position-absolute top-0 end-0"
				/>
			</div>
			<Modal.Body style={{ padding: "30px" }} className="m-2 ">
				<h1 className="mb-5 text-center fw-bold">Register</h1>
				{message && message}

				<Form>
					<Form.Group controlId="inputFullName">
						<Form.Label className="h5 fw-bold">Full Name</Form.Label>
						<Form.Control
							className=" p-3 mb-4 "
							type="text"
							name="fullname"
							// placeholder="Full Name"
							onChange={handleChange}
							style={{ background: "#f0f0f0" }}
						/>
					</Form.Group>
					<Form.Group controlId="inputEmail">
						<Form.Label className="h5 fw-bold">Email</Form.Label>
						<Form.Control
							className=" p-3 mb-4 "
							type="email"
							name="email"
							// placeholder="Email"
							onChange={handleChange}
							style={{ background: "#f0f0f0" }}
						/>
					</Form.Group>

					<Form.Group controlId="inputPassword">
						<Form.Label className="h5 fw-bold">Password</Form.Label>

						<Form.Control
							className="  p-3 mb-4"
							type="password"
							name="password"
							aria-describedby="passwordHelpBlock"
							// placeholder="Password"
							onChange={handleChange}
							style={{ background: "#f0f0f0" }}
						/>
					</Form.Group>
					<Form.Group controlId="inputPhone">
						<Form.Label className="h5 fw-bold">Phone</Form.Label>
						<Form.Control
							className=" p-3 mb-4 "
							type="number"
							name="phone"
							// placeholder="Phone"
							onChange={handleChange}
							style={{ background: "#f0f0f0" }}
						/>
					</Form.Group>
					<Form.Group controlId="inputAddress">
						<Form.Label className="h5 fw-bold">Address</Form.Label>
						<Form.Control
							className=" p-3 mb-4 "
							as="textarea"
							name="address"
							onChange={handleChange}
							style={{ background: "#f0f0f0", height: "150px" }}
						/>
					</Form.Group>
					<Button
						className=" w-100 p-2 fw-bold mb-3 p-2 "
						variant="primary"
						onClick={handleRegister}
					>
						<h4>Register</h4>
					</Button>
				</Form>

				{/* <p className="text-center text-muted">
						Have account Registered ? Click
						<a href="#" className="  ">
							Here
						</a>
					</p> */}
			</Modal.Body>
		</Modal>
	);
}

export default ModalRegis;
