import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../action";

const Container = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 10;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
	height: 100%;
	max-width: 1128px;
`;

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0;

	img {
		height: 100%;
	}
`;

const Search = styled.div`
	flex-grow: 1;
	position: relative;
	@media (max-width: 768px) {
		flex-grow: unset;
	}
	
	div {
		max-width: 280px;
		input {
			border: none;
			box-shadow: none;
			background-color: #eef3f8;
			border-radius: 2px;
			color: rgba(0, 0, 0, 0.9);
			width: 218px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 34px;
			vertical-align: text-top;
			border-color: #dce6f1;
			@media (max-width: 768px) {
				width: 140px;
			}
		}
	}
`;

const SearchIcon = styled.div`
	width: 40px;
	z-index: 1;
	position: absolute;
	top: 10px;
	left: 5px;
	border-radius: 0 2px 2px 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Nav = styled.nav`
	margin-left: auto;
	display: block;
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		width: 100%;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: space-between;
	padding: 0;
	margin: 0;
`;

const NavList = styled.li`
	display: flex;
	align-items: center;
	position: relative;

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: transparent;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		min-height: 52px;
		min-width: 80px;
		text-decoration: none;
		color: rgba(0, 0, 0, 0.6);
		
		img {
			width: 24px; /* Adjust icon size if necessary */
		}

		span {
			display: flex;
			align-items: center;
			text-align: center;
			margin-top: 4px;
		}

		@media (max-width: 768px) {
			min-width: 50px;
			font-size: 9px;

			img {
				width: 40%;
			}
		}
	}

	&:hover a span,
	&:active a span {
		color: rgba(0, 0, 0, 0.9);
	}

	.active span::after {
		content: "";
		transform: scaleX(1);
		border-bottom: 2px solid rgba(0, 0, 0, 0.9);
		position: absolute;
		left: 0;
		bottom: 0;
		transition: transform 0.2s ease-in-out;
		width: 100%;
	}
`;

const SignOut = styled.div`
	position: absolute;
	top: 45px;
	background: white;
	border-radius: 0 0 5px 5px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	text-align: center;
	transition-duration: 167ms;
	display: none;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 15;

	@media (min-width: 768px) {
		${NavList}:hover & {
			display: flex;
		}
	}
`;

const SignOutMobile = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		padding-left: 1rem;
		font-size: 14px;
		cursor: pointer;
	}
`;

const User = styled(NavList)`
	a > img {
		border-radius: 50%;
		width: 25px;
		height: 25px;
	}
`;

const Work = styled(User)`
	border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

function Header(props) {
	const handleSignOut = () => {
		props.signOut();
	};

	return (
		<Container>
			<Content>
				<Logo>
					<a href="/feed">
						<img src="/images/home-logo.svg" alt="LinkedIn Logo" />
					</a>
				</Logo>
				<Search>
					<div>
						<input type="text" placeholder="Search" />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="Search Icon" />
					</SearchIcon>
				</Search>
				<SignOutMobile onClick={handleSignOut}>
					Sign Out
				</SignOutMobile>
				<Nav>
					<NavListWrap>
						<NavList className="active">
							<a href="/feed">
								<img src="/images/nav-home.svg" alt="Home Icon" />
								<span>Home</span>
							</a>
						</NavList>
						<NavList>
							<a href="/network">
								<img src="/images/nav-network.svg" alt="My Network Icon" />
								<span>My Network</span>
							</a>
						</NavList>
						<NavList>
							<a href="/jobs">
								<img src="/images/nav-jobs.svg" alt="Jobs Icon" />
								<span>Jobs</span>
							</a>
						</NavList>
						<NavList>
							<a href="/messaging">
								<img src="/images/nav-messaging.svg" alt="Messaging Icon" />
								<span>Messaging</span>
							</a>
						</NavList>
						<NavList>
							<a href="/notifications">
								<img src="/images/nav-notifications.svg" alt="Notifications Icon" />
								<span>Notifications</span>
							</a>
						</NavList>
						<User>
							<a href="/home">
								{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="User Avatar" /> : <img src="/images/user.svg" alt="User Icon" />}
								<span>
									Me <img src="/images/down-icon.svg" alt="Dropdown Icon" />
								</span>
							</a>
							<SignOut onClick={handleSignOut}>
								Sign Out
							</SignOut>
						</User>
						<Work>
							<a  href="https://www.example.com" target="_blank" rel="noopener noreferrer">
								<img src="/images/nav-work.svg" alt="Work Icon" />
								<span>
									Work <img src="/images/down-icon.svg" alt="Dropdown Icon" />
								</span>
							</a>
						</Work>
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => ({
	user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
