import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API } from "../../configAPI/api";
import CardPost from "../elements/CardPost";
import AlertTooltips from "../elements/AlertTooltips";

import { Col, Container, Row } from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";

function Bookmark() {
	const navigate = useNavigate();

	const title = "Bookamark";
	document.title = "The Journey | " + title;

	const [bookmark, setBookmark] = useState(true);
	const [alert, setAlert] = useState(null);

	const [dataBookmark, setDataBookmark] = useState([]);

	const { id } = useParams();

	const getBookmark = async () => {
		const response = await API.get(`/bookmark/${id}`);

		const resData = response.data.dataBookmark;

		const listBookmark = resData.map((item) => {
			return item.journeyPosts;
		});
		setDataBookmark(listBookmark);
	};

	const message = (
		<AlertTooltips
			show={true}
			onClose={() => setAlert(null)}
			bg="danger"
			text="Bookmark Removed"
		/>
	);

	useEffect(() => {
		getBookmark();
	}, []);

	const handleBookmark = async (idJourney) => {
		setBookmark(!bookmark);
		setAlert(message);
		return await API.delete(`/bookmark/${idJourney}`);
	};

	useEffect(() => {
		if (bookmark === false) {
			setBookmark(!bookmark);
			getBookmark();
		}
		return () => {
			setDataBookmark([]);
		};
	}, [bookmark]);

	return (
		<div>
			<Container fluid style={{ padding: 0 }}>
				<NavbarUser />
				{alert && alert}

				<div className="mx-5 py-5">
					<Col>
						<h1 className="mb-5">
							<dt>My Bookmark</dt>
						</h1>
					</Col>
					<Col>
						<Row>
							<>
								{dataBookmark.map((item, index) => (
									<Col lg={3} key={index}>
										<CardPost
											item={item}
											bookmark={bookmark}
											handleBookmark={(id) => handleBookmark(id)}
										/>
									</Col>
								))}
							</>
						</Row>
					</Col>
				</div>
			</Container>
		</div>
	);
}

export default Bookmark;
