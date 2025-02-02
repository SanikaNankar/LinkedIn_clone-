import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";
import Right from "./Right";

const Container = styled.div`
	max-width: 100%;
`;

const Content = styled.div`
	max-width: 1128px;
	margin: auto;
`;

const Section = styled.section`
	min-height: 50px;
	margin: 16px 0 -30px;
	box-sizing: content-box;
	text-align: center;
	text-decoration: underline;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 0 5px;

	h5 {
		color: #0a66c2;
		font-size: 14px;
		margin: 0;
		a {
			font-weight: 700;
			text-decoration: none; /* Remove underline from links */
		}
	}

	p {
		font-size: 14px;
		color: #434649;
		margin: 0;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		padding: 0 5px;
	}
`;

const Layout = styled.div`
	display: grid;
	grid-template-areas: "left main right";
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 25px;
	row-gap: 25px;
	margin: 25px 0;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
	}
`;

function Home(props) {
	if (!props.user) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<Content>
				<Section>
					<h5>
						<a href="#hiring">Hiring in a hurry?</a>
					</h5>
					<p>- Find talented pros in record time with LinkedIn and keep business moving.</p>
				</Section>
				<Layout>
					<Left />
					<Main />
					<Right />
				</Layout>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => ({
	user: state.userState.user,
});

export default connect(mapStateToProps)(Home);
