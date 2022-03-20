import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { Container, Stack, Form, Button } from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import { API } from "../../configAPI/api";
import { useNavigate, useParams } from "react-router-dom";
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

function UpdateJourney() {
	const navigate = useNavigate();

	const { id } = useParams()

	const title = "Update Journey";
	document.title = "The Journey | " + title;

	const [state, dispatch] = useContext(UserContext);
	const [preview, setPreview] = useState(null);
	const [alert, setAlert] = useState(null);

	const [thumb, setThumb] = useState({
		image: "",
	});

	const [form, setForm] = useState({
		title: "",

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


	const getJourney =async () => {

		const response = await API.get(`journey/${id}`)
		const dataRes = response.data.data.dataJourney[0];
		setModel({
			...model,
			content : dataRes.desc
		})
		setForm({
			...form,
			title : dataRes.title,


		})
		setPreview(dataRes.image)

		
	}
	const handleChangeThumb = (e) => {
		setThumb({
			[e.target.name]:
				e.target.type === "file" ? e.target.files : e.target.value,
		});

		if (e.target.type === "file") {
			let url = URL.createObjectURL(e.target.files[0]);
			// console.log(url);
			setPreview(url);
		}
		
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	};


	const handleThumb= async () => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};

			const formData = new FormData();

			formData.set("image", thumb.image[0], thumb.image[0].name);

			const resImg = await API.patch(`/journey/${id}/thumb`, formData, config);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			let data = {
				title : form.title,
				desc : model.content
			}

			const response = await API.patch(`/journey/${id}`, data, config);
			console.log(response);
			if (response.status === 201) {
			handleThumb()

				Swal.fire({
					title: "Success",
					text: "You Update Post Journey!",
					icon: "success",
				});

				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getJourney()
		return () => {

		}
	}, [])
	return (
		<>
			<NavbarUser />
			<Container fluid className="px-5">
				<h1 className="my-5">
					<dt>Edit Journey</dt>
				</h1>
				{alert && alert}

				<Container>
					<Stack>
						<Form>
							<Form.Label className="h5 fw-bold">Title</Form.Label>
							<Form.Control
								className=" p-2 mb-4 "
								type="text"
								value={form.title}
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
								onChange={handleChangeThumb}
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

export default UpdateJourney;
