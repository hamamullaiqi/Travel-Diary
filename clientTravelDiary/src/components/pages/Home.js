import React, { useState, useContext, useEffect } from "react";
import { API } from "../../configAPI/api";
import ModalLogin from "../Modals/ModalLogin";
import ModalRegis from "../Modals/ModalRegis";
import {
	Col,
	Container,
	InputGroup,
	Form,
	Button,
	Stack,
	Row,
	Card,
} from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import HomeTitle from "./HomeTitle";
import CardPost from "../elements/CardPost";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";

function Home() {
	document.title = "The Journey";

	const [state, dispatch] = useContext(UserContext);
	const [journeys, setJourneys] = useState([]);
	const [search, setSearch] = useState("");
	const [bookmark, setBookmark] = useState(false);
	const [modalLogin, setModalLogin] = useState(false);
	const [modalRegis, setModalRegis] = useState(false);
	const [alert, setAlert] = useState(null);

	const idUser = state.user.id;

	const searchFilter = journeys.filter((journey) => {
		return journey.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
	});

	const getJourneys = async () => {
		const response = await API.get("/journeys");
		setJourneys(response.data.data.dataJourneys);
	};

	useEffect(() => {
		getJourneys();

		return () => {
			setJourneys([])
		}
		
	}, [state.isLogin]);

	const handleBookmark = async (idJourney) => {
		if (state?.isLogin) {
			setBookmark(!bookmark);

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			let data = {
				idUser,
				idJourney: idJourney,
			};

			data = JSON.parse(JSON.stringify(data));

			const response = await API.post("/bookmark", data, config);
			if (response.status === 200) {
				Swal.fire({
					title: "success",
					text: "Bookmark!",
					icon: "success",
				});
			}
		}
	};
	
	return (
		<div>
			<Container fluid style={{ padding: 0 }}>
				{state.isLogin ? <NavbarUser /> : <HomeTitle />}
				{alert && alert}

				<div className="mx-5 py-3">
					<Col>
						<h1>
							<dt>Journey</dt>
						</h1>
						<InputGroup className="p-5  ">
							<Form.Control
								type="search"
								placeholder="Find Journey"
								aria-describedby="search"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button variant="primary" className="px-5" id="search">
								Search
							</Button>
						</InputGroup>
					</Col>
					<Row>
						<>
							{searchFilter.map((item, index) => (
								<Col lg={3} key={index}>
									<CardPost
										item={item}
										bookmark={bookmark}
										handleBookmark={(id) => handleBookmark(id)}
										handleModal={(value) => setModalLogin(value)}
									/>
								</Col>
							))}
						</>
					</Row>
				</div>
				{modalRegis ? (
					<ModalRegis
						show={modalRegis}
						onHide={() => setModalRegis(!modalRegis)}
					/>
				) : (
					""
				)}
				{modalLogin ? (
					<ModalLogin
						show={modalLogin}
						onHide={() => setModalLogin(!modalLogin)}
						handleModalRegis={(value) => setModalRegis(value)}
					/>
				) : (
					" "
				)}
			</Container>
		</div>
	);
}

export default Home;
