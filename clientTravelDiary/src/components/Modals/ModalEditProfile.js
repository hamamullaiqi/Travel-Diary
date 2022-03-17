import React, { useEffect, useState, useContext } from "react";
import * as Icon from "react-bootstrap-icons";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import avatarDummy from "../../assets/img/null.png";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
import Swal from "sweetalert2";

const path = "http://localhost:4000/uploads/";

function ModalEditProfile(props) {
	const title = "Edit Profile";
	document.title = "The Journey | " + title;

	const navigate = useNavigate();
	const { id } = useParams();
	const [state, dispatch] = useContext(UserContext);
	const [avatar, setAvatar] = useState(null);
	const [message, setMessage] = useState(null);

	const [img, setImg] = useState({
		image: "",
	});

	const [form, setForm] = useState({
		fullname: "",
		email: "",
		// password: "",
		phone: "",
		address: "",
	});

	const { fullname, email, password, phone, address } = form;

	//fecth dataProfile
	const getProfile = async () => {
		const response = await API.get(`/user/${id}`);

		setAvatar(path + response.data.data.dataUser.image);
		setForm({
			...form,
			fullname: response.data.data.dataUser.fullname,
			email: response.data.data.dataUser.email,
			phone: response.data.data.dataUser.phone,
			address: response.data.data.dataUser.address,
		});
	};

	useEffect(() => {
		getProfile();

		return () => {
			setForm({});
		};
	}, []);

	//handle change Edit User
	const handleChange = (e) => [
		setForm({
			...form,
			[e.target.name]: e.target.value,
		}),
	];

	//handle change Form input Image
	const handleChangeAvatar = (e) => {
		setImg({
			[e.target.name]:
				e.target.type === "file" ? e.target.files : e.target.value,
		});

		if (e.target.type === "file") {
			let url = URL.createObjectURL(e.target.files[0]);
			// console.log(url);
			setAvatar(url);
		}
	};

	//handle to save image to server
	const handleSaveAvatar = async () => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};

			const formData = new FormData();

			formData.set("image", img.image[0], img.image[0].name);

			const resImg = await API.patch(`/profile/${id}/avatar`, formData, config);
		} catch (error) {
			console.log(error);
		}
	};

	//handle to save input to server
	const handleSave = async (e) => {
		try {
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			// console.log(form);

			const response = await API.patch(`/profile/${id}`, form, config);

			if (response.data.status === "success") {
				Swal.fire({
					title: "success",
					text: "Updated!",
					icon: "success",
				});
				
				handleSaveAvatar();
				handleCloseModal(false);
				
			}
		} catch (error) {
			console.log(error);
		}
	};

	//handle close modal after update profile success
	const handleCloseModal = (value) => {
		props.onHide(!value);
	};

	return (
		<Modal show={props.show} onHide={props.onHide} centered>
			<div className="position-relative ">
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
				<h1 className="mb-5 text-center fw-bold">Edit Profile</h1>

				<div className="position-relative text-center">
					<Form.Label htmlFor="input-image">
						<Form.Control
							id="input-image"
							name="image"
							onChange={handleChangeAvatar}
							className="input-image "
							type="file"
							style={{ display: "none" }}
						/>
						<div
							className="rounded-circle  bg-primary shadow"
							style={{
								position: "absolute",
								top: "150px",
								right: "130px",
								padding: "8px",
								cursor: "pointer",
							}}
						>
							<Icon.PencilSquare color="white" size={24} />
						</div>
					</Form.Label>

					<img
						src={avatar === path + null ? avatarDummy : avatar}
						alt="avatar"
						className="rounded-circle border border-3 border-primary mb-3"
						style={{
							width: "12rem",
							height: "12rem",
							objectFit: "cover",
						}}
					/>
				</div>

				<Form>
					<Form.Group controlId="inputFullName">
						<Form.Label className="h5 fw-bold">Full Name</Form.Label>
						<Form.Control
							className=" p-3 mb-4 "
							type="text"
							name="fullname"
							value={form.fullname}
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
							value={form.email}
							// placeholder="Email"
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
							value={form.phone}
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
							value={form.address}
							// id="inputAddress"
							onChange={handleChange}
							style={{ background: "#f0f0f0", height: "150px" }}
						/>
					</Form.Group>
					<Button
						className=" w-100 p-2 fw-bold mb-3 p-2 "
						variant="primary"
						onClick={handleSave}
					>
						<h4>Save</h4>
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default ModalEditProfile;
