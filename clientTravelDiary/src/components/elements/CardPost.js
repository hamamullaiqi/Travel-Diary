import React, { useState, useContext, useEffect } from "react";

import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../configAPI/api";
import { UserContext } from "../../context/userContext";

export const getFullTime = (time) => {
	let mouth = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"november",
		"Desember",
	];

	let times = new Date(time);

	let date = times.getDate();

	let mouthIndex = times.getMonth(); 
	let yaer = times.getFullYear();

	let fullTime = `${date} ${mouth[mouthIndex]} ${yaer} `;

	return fullTime;
};

function CardPost(props) {
	const navigate = useNavigate();

	// console.log(item);
	const [bookmark, setBookmark] = useState(props.bookmark);

	const [state, dispatch] = useContext(UserContext);

	const handleClickBookmark = (id) => {
		if(state.isLogin){
			setBookmark(!bookmark);
			props.handleBookmark(id);
		} else {
			setBookmark(false)
			props.handleModal(true)
		}
		
	};

	function convertToPlain(html) {
		// membungkus param html ke div
		let tempDivElement = document.createElement("div");
		// convert param to html
		tempDivElement.innerHTML = html;
		// Retrieve the text property of the element
		return tempDivElement.textContent || tempDivElement.innerText || "";
	}

	return (
		<>
			<Card style={{ width: "18rem" }} className="shadow mb-4">
				<div
					style={{
						width: "30px",
						height: "30px",
						position: "absolute",
						backgroundColor: "#fff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "50px",
						top: "10px",
						right: "10px",
						cursor: "pointer",
					}}
					className="btn shadow"
					onClick={() => handleClickBookmark(props.item.id)}
				>
					{" "}
					{bookmark ? (
						<img src="../assets/bookmark-active.svg" alt="bokmark-active" />
					) : (
						<img src="../assets/bookmark.svg" alt="bokmark" />
					)}
				</div>

				<Card.Img
					variant="top"
					src={props.item.image}
					style={{ height: "200px", objectFit: "cover" }}
				/>

				<Card.Body>
					<Link
						to={{
							pathname: `detail-journey/${props.item.id}`,
						}}
						style={{ textDecoration: "none", color: "#000" }}
					>
						<dt style={{ fontSize: "16px" }}>{convertToPlain(props.item.title).substr(0, 25) + "..."}</dt>
						<p className="text-muted" style={{ fontSize: "12px" }}>
							{getFullTime(props.item.createdAt)}, {props.item.author.fullname}
						</p>
						<Card.Text style={{ fontSize: "12px" }}>
							{props.item.desc.length > 100
								? convertToPlain(props.item.desc).substr(0, 100) + "..." + "..."
								: convertToPlain(props.item.desc)}{" "}
						</Card.Text>
					</Link>
				</Card.Body>
			</Card>
		</>
	);
}

export default CardPost;
