import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import NavTop from "../navbars/NavTop";
import NavbarUser from "../navbars/NavbarUser";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
import { useParams } from "react-router-dom";
import { getFullTime } from "../elements/CardPost";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

function DetailJourney() {

	

	const [state, dispatch] = useContext(UserContext);
	const [desc, setDesc] = useState({});
	const [author, setAuthor] = useState({});
	// console.log(author);

	const { id } = useParams();
	// console.log(id);

	const getDetail = async () => {
		const response = await API.get(`/journey/${id}`);
		// console.log(response);
		let dataRes = response.data.data.dataJourney;

		setDesc(dataRes[0]);
		setAuthor(dataRes[0].author);
	};

	useEffect(() => {
		getDetail();
		return () => {
			setDesc([]);
		};
	}, []);


	// const title = "Journey";
	document.title = "The Journey | "  + desc.title

	return (
		<>
			{state.isLogin ? <NavbarUser /> : <NavTop />}
			<Container className="py-5">
				<Row className="align-items-center">
					<Col lg={6}>
						<h2 className="fw-bold">{desc.title}</h2>
						<h6 className="text-primary mb-5">{getFullTime(desc.createdAt)}</h6>
					</Col>
					<Col lg={6}>
						<h5 className="text-end">{author.fullname}</h5>
					</Col>
				</Row>
				<Stack style={{ fontSize: "15px" }} gap={5}>
					<img
						src={desc.image}
						alt="image"
						style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
					/>

					<FroalaEditorView model={desc.desc} />
				</Stack>
			</Container>
		</>
	);
}

export default DetailJourney;
