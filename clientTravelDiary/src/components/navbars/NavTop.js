import React, { useEffect, useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import ModalRegis from "../Modals/ModalRegis";
import ModalLogin from "../Modals/ModalLogin";
import { Link } from "react-router-dom";

function NavTop(props) {
	const [modalRegis, setModalRegis] = useState(false);
	const [modalLogin, setModalLogin] = useState(false);


	useEffect(() => {
		return () => {
			setModalLogin(false)
			setModalRegis(false)
		}
	
	}, [])

	return (
		<Navbar className={props.shadow}>
			<Container>
				<Link to="/">
					<Navbar.Brand>
						<img
							src={logo}
							alt="logo"
							width="140"
							height="46"
							className=" position-absolute1"
						/>
					</Navbar.Brand>
				</Link>

				<div>
					<Button
						variant="outline-light"
						className="px-5 mx-3"
						onClick={() => setModalLogin(!modalLogin)}
					>
						Login
					</Button>
					<Button
						variant="primary"
						className="px-5"
						onClick={() => setModalRegis(!modalRegis)}
					>
						Register
					</Button>
				</div>
			</Container>
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
				""
			)}
		</Navbar>
	);
}

export default NavTop;
