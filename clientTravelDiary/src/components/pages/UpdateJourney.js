import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Container, Stack, Form, Button } from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import { API } from "../../configAPI/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import "froala-editor/js/languages/de.js";
import "font-awesome/css/font-awesome.css";
import "froala-editor/js/third_party/font_awesome.min.js";
import FroalaEditor from "react-froala-wysiwyg";

export const path = "http://localhost:4000/upload_image";

function AddJourney() {
	const navigate = useNavigate();

	const title = "New Journey";
	document.title = "The Journey | " + title;

	const [state, dispatch] = useContext(UserContext);
	const [preview, setPreview] = useState(null);
	const [alert, setAlert] = useState(null);

	const [form, setForm] = useState({
		title: "",
		image: "",
	});

	const [model, setModel] = useState({
		content: "",
	});


	const handleModel = (model) => {
		setModel({
			...model,
			content: model,
		});
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]:
				e.target.type === "file" ? e.target.files : e.target.value,
		});

		if (e.target.type === "file") {
			let url = URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};

			const formData = new FormData();
			formData.set("idUser", state.user.id);
			formData.set("title", form.title);
			formData.set("image", form.image[0], form.image[0].name);
			formData.set("desc", model.content);

			const response = await API.post("/journey", formData, config);
			// console.log(response);
			if (response.status === 200) {
				Swal.fire({
					title: "Success",
					text: "You Add Post Journey!",
					icon: "success",
				});
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<NavbarUser />
			<Container fluid className="px-5">
				<h1 className="my-5">
					<dt>New Journey</dt>
				</h1>
				{alert && alert}

				<Container>
					<Stack>
						<Form>
							<Form.Label className="h5 fw-bold">Title</Form.Label>
							<Form.Control
								className=" p-2 mb-4 "
								type="text"
								name="title"
								onChange={handleChange}
							/>
							<div className="mb-5 text-center">
								<img
									src={preview === null ? "" : preview}
									style={{
										Width: "800px",
										maxHeight: "300px",
										objectFit: "cover",
									}}
								/>
							</div>
							<Form.Label className="h5 fw-bold">Cover Image</Form.Label>
							<Form.Control
								className=" p-2 mb-4 "
								type="file"
								name="image"
								onChange={handleChange}
							/>

							<FroalaEditor
								tag="textarea"
								config={{
									imageUploadURL: "http://localhost:4000/upload_image",
									folderPath: "http://localhost:4000/uploads",
									events: {
										"image.removed": function ($img) {
											var xhttp = new XMLHttpRequest();
											var url = "http://localhost:4000/deleteImage";
											let data = $img.attr("src");

											data = data.substr(21);

											xhttp.onreadystatechange = function () {
												// Image was removed.
												if (this.readyState == 4 && this.status == 200) {
													console.log("image was deleted");
												}
											};
											xhttp.open("post", url, true);
											xhttp.setRequestHeader(
												"Content-Type",
												"application/json"
											);

											xhttp.send(
												JSON.stringify({
													src: data,
												})
											);
										},
									},
								}}
								model={model.content}
								onModelChange={handleModel}
							/>

							<Button
								className="p-2  mt-3 px-5 float-end"
								variant="primary"
								onClick={handleSubmit}
							>
								Post
							</Button>
						</Form>
					</Stack>
				</Container>
			</Container>
		</>
	);
}

export default AddJourney;
