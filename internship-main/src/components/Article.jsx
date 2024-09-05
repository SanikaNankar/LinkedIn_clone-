import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// Styled components
const ArticleContainer = styled.div`
	padding: 20px;
	background: #fff;
	border-radius: 5px;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%);
	margin-bottom: 20px;
`;

const ArticleContent = styled.div`
	margin-bottom: 10px;
`;

const ArticleImage = styled.img`
	width: 100%;
	height: auto;
	border-radius: 5px;
`;

const Article = ({ articles }) => {
	return (
		<>
			{articles.map((article) => (
				<ArticleContainer key={article.id}>
					<ArticleContent>
						<p>{article.description}</p>
						{article.sharedImg && <ArticleImage src={article.sharedImg} alt="Shared content" />}
					</ArticleContent>
				</ArticleContainer>
			))}
		</>
	);
};

const mapStateToProps = (state) => ({
	articles: state.articleState.articles,
});

export default connect(mapStateToProps)(Article);
