import React, { useState, useContext, useEffect } from "react";
import {
	Col,
	Container,
	Form,
	Row,
	Stack,
	Button,
	Dropdown,
	Nav,
} from "react-bootstrap";
import NavTop from "../navbars/NavTop";
import NavbarUser from "../navbars/NavbarUser";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
import { useNavigate, useParams } from "react-router-dom";
import { getFullTime } from "../elements/CardPost";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Swal from "sweetalert2";
import avatarDummy from "../../assets/img/null.png";
import { db } from "../../configAPI/apiFirebase";
import {
	collection,
	where,
	getDocs,
	query,
	addDoc,
	orderBy,
	updateDoc,
	doc,
	deleteDoc,
	ref,
} from "firebase/firestore";
import { getDistanceTime } from "../elements/date";
import * as Icon from "react-bootstrap-icons";
import { async } from "@firebase/util";

export const path = "http://localhost:4000/uploads/";

function DetailJourney() {
	const navigate = useNavigate();
	const [state, dispatch] = useContext(UserContext);
	const [desc, setDesc] = useState({});
	const [author, setAuthor] = useState({});
	const [avatar, setAvatar] = useState(null);
	const [btnComment, setBtnComment] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentChange, setCommentChange] = useState(false);
	const [upadteJourney, setUpadteJourney] = useState(false);

	const [loadmore, setLoadmore] = useState(4);

	const slice = comments.slice(0, loadmore);

	const handleMore = () => {
		setLoadmore(comments.length);
	};

	const { id } = useParams();

	const commentCollRef = query(collection(db, "comments"));

	const getComments = async () => {
		const commentsCollRef = query(
			collection(db, "comments"),
			orderBy("data.date", "desc"),
			where("idJourney", "==", id)
		);

		const data = await getDocs(commentsCollRef);
		setComments(data.docs.map((doc) => ({ ...doc.data() })));
	};

	const deleteJourneyComments = async () => {
		Swal.fire({
			title: "Are you sure Delete..",
			text: desc.title,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Log Out!",
		}).then(async(result) => {
			if (result.isConfirmed) {
				const response = await API.delete(`journey/${id}`);
				//delete Alldata comments where idJourney in firebase
				const commentsCollRef = query(
					collection(db, "comments"),
					orderBy("data.date", "desc"),
					where("idJourney", "==", id)
				);

				const data = await getDocs(commentsCollRef);
				let dataId = data.docs.map((doc) => doc.id);

				data.forEach(async (result) => {
					const docRef = doc(db, "comments", result.id);
					await deleteDoc(docRef);
				});

				navigate("/");
			}
		});
	};

	const addComment = async () => {
		const data = {
			idJourney: id,
			data: {
				date: new Date(),
				text: form.comment,
				user: {
					id: state.user.id,
					fullname: state.user.fullname,
					image: state.user.image,
				},
			},
		};

		const response = await addDoc(commentCollRef, data);

		setCommentChange(!commentChange);
		setForm({
			...form,
			comment: "",
		});

		return setBtnComment(false);
	};

	const [form, setForm] = useState({
		comment: "",
	});

	const handleCancel = () => {
		setForm({
			...form,
			comment: "",
		});

		return setBtnComment(false);
	};

	const handleChange = (e) => {
		setBtnComment(true);
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleClickAuthor = () => {
		if (state.isLogin) {
			navigate(`../profile/${author.id}`, { replace: true });
		} else {
			Swal.fire({
				title: "Not Allowed",
				text: "Login requeired!",
				icon: "error",
			});
			navigate("/");
		}
	};

	const getDetail = async () => {
		const response = await API.get(`/journey/${id}`);
		let dataRes = response.data.data.dataJourney;
		setDesc(dataRes[0]);
		setAuthor(dataRes[0].author);
	};

	useEffect(() => {
		getComments();
	}, [commentChange]);

	useEffect(() => {
		getDetail();
		// getComments();

		if (state.isLogin) {
			setAvatar(state.user.image);
		} else {
			setAvatar(null);
		}

		return () => {
			setDesc([]);
		};
	}, [avatar]);

	document.title = "The Journey | " + desc.title;

	return (
		<>
			{state.isLogin ? <NavbarUser /> : <NavTop shadow="shadow" />}
			<Container className="py-5">
				<Row className="align-items-center">
					<Col lg={11}>
						<h2 className="fw-bold">{desc.title}</h2>
					</Col>
					{state.user.id === author.id && (
						<Col lg={1}>
							<Dropdown align="end">
								<Dropdown.Toggle
									as={Button}
									variant="link"
									className="dropdwon-toggle"
								>
									<Icon.ThreeDots color="secondary" size={30} />
								</Dropdown.Toggle>

								<Dropdown.Menu className=" shadow text-center">
									<Dropdown.Item
										onClick={() => navigate(`/update-journey/${id}`)}
									>
										<span>Edit Journey</span>
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={deleteJourneyComments}>
										<span className="text-danger">Delete Journey</span>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					)}

					<Col lg={6}>
						<h6 className="text-primary mb-5">{getFullTime(desc.createdAt)}</h6>
					</Col>
					<Col lg={6}>
						<h5
							className="text-end text-primary"
							style={{ cursor: "pointer" }}
							onClick={handleClickAuthor}
						>
							@{author.fullname}
						</h5>
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
				<div>
					<div>
						<Row>
							<hr />
							<h5 className="mb-5 fw-bold">{comments.length} Comments </h5>
							{state.isLogin ? (
								<>
									<Col lg={1}>
										<div className="ps-3">
											<img
												src={avatar === null ? avatarDummy : path + avatar}
												alt="avatar"
												className="rounded-circle border border-3 border-primary "
												style={{
													width: "3rem",
													height: "3rem",
													objectFit: "cover",
												}}
											/>
										</div>
									</Col>
									<Col>
										<Form>
											<Form.Control
												className="p-3 mb-4 "
												as="textarea"
												style={{ background: "#f0f0f0", height: "80px" }}
												value={form.comment}
												name="comment"
												onChange={handleChange}
												placeholder="Comments ...."
											/>
											{btnComment && (
												<div>
													<Button
														className="px-3 ms-3 float-end"
														variant="danger"
														onClick={handleCancel}
													>
														Cancel
													</Button>
													<Button
														className="px-3 float-end"
														variant="primary"
														onClick={addComment}
													>
														Post
													</Button>
												</div>
											)}
										</Form>
									</Col>
								</>
							) : (
								" "
							)}
						</Row>
					</div>

					<div style={{ marginLeft: "100px" }}>
						{comments?.length !== 0 ? (
							<>
								{slice.map((item, index) => (
									<Row key={index}>
										<Col lg={1}>
											<div className="ps-3">
												<img
													src={
														item.data.user.image == null
															? avatarDummy
															: path + item.data.user.image
													}
													alt="avatar"
													className="rounded-circle border border-3 border-primary "
													style={{
														width: "3rem",
														height: "3rem",
														objectFit: "cover",
													}}
												/>
											</div>
										</Col>
										<Col>
											<div>
												<Stack direction="horizontal" gap={2}>
													<h6 className="fw-bold">{item.data.user.fullname}</h6>
													<h6 muted>
														{getDistanceTime(item.data.date.toDate())}
													</h6>
												</Stack>
												<p>{item.data.text}</p>
												<hr />
											</div>
										</Col>
									</Row>
								))}
								{comments.length > loadmore ? (
									<Button variant="link" onClick={handleMore}>
										See {comments.length - loadmore} more comments ...
									</Button>
								) : (
									""
								)}
							</>
						) : (
							<p>Tidak Ada komens</p>
						)}
					</div>
				</div>
			</Container>
		</>
	);
}

export default DetailJourney;
