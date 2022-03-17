import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { API } from "../../configAPI/api";
import Swal from "sweetalert2";

function ModalLogin(props) {
	const navigate = useNavigate();

	const title = "Login";
	document.title = "The Journey | " + title;

	const [state, dispatch] = useContext(UserContext);
	const [message, setMessage] = useState(null);

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const { email, password } = form;

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleCloseModal = (value) => {
		props.onHide(!value);
	};

	const handleLogin = async (e) => {
		try {
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const body = JSON.stringify(form);

			const response = await API.post("/login", body, config);

			const alert = <Alert variant="success">{response.data.status}</Alert>;
			
			setMessage(alert);
			if (response?.status === 200) {
				if (response.data.status === "success") {
					dispatch({
						type: "LOGIN_SUCCESS",
						payload: response.data.data.user,
					});
					Swal.fire({
						title: "Wellcome Back",
						text: response.data.data.user.fullname,
						icon: "success",
					});
					handleCloseModal(false);
					navigate("/");
				}
			}
		} catch (error) {
			console.log(error);
			const alert = (
				<Alert variant="danger">Email or Password Not match!</Alert>
			);
			setMessage(alert);
		}
	};

	const handleRegis = (value) => {
		props.handleModalRegis(value);
		props.onHide(!value);
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
				<h1 className="mb-5 text-center fw-bold">Login</h1>
				{message && message}

				<Form>
					<Form.Group controlId="inputEmail">
						<Form.Label className="h5 fw-bold">Email</Form.Label>
						<Form.Control
							className=" p-3 mb-4 "
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="Email"
						/>
					</Form.Group>

					<Form.Group controlId="inputPassword">
						<Form.Label className="h5 fw-bold">Password</Form.Label>

						<Form.Control
							className="  p-3 mb-4"
							type="password"
							name="password"
							onChange={handleChange}
							aria-describedby="passwordHelpBlock"
							placeholder="Password"
						/>
					</Form.Group>
					<Button
						className=" w-100 p-2 fw-bold mb-3 p-2 "
						variant="primary"
						onClick={handleLogin}
					>
						<h4>Login</h4>
					</Button>
				</Form>

				<p className="text-center text-muted">
					Don't have an account ? Click
					<a
						onClick={() => handleRegis(true)}
						className="fw-bold text-primary ms-1"
						style={{ cursor: "pointer" }}
					>
						Here
					</a>
				</p>
			</Modal.Body>
		</Modal>
	);
}

export default ModalLogin;
