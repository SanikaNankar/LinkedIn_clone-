import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../action";
import styled from "styled-components";

const PostContainer = styled.div`
	margin: 20px 0;
`;

const Post = styled.div`
	background: #fff;
	border: 1px solid #ddd;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
`;

const PostImage = styled.img`
	width: 100%;
	max-height: 400px;
	object-fit: cover;
`;

const LikeButton = styled.button`
	background: none;
	border: none;
	color: #0a66c2;
	cursor: pointer;
`;

function Posts({ articles, getArticles }) {
	useEffect(() => {
		getArticles();
	}, [getArticles]);

	const handleLike = (articleId, userId) => {
		// Dispatch likeArticleAPI with articleId and userId
	};

	return (
		<PostContainer>
			{articles && articles.map((article, index) => (
				<Post key={index}>
					{article.sharedImg && <PostImage src={article.sharedImg} alt="Post Image" />}
					<p>{article.description}</p>
					<LikeButton onClick={() => handleLike(article.id, article.actor.email)}>Like</LikeButton>
				</Post>
			))}
		</PostContainer>
	);
}

const mapStateToProps = (state) => ({
	articles: state.articleState.articles,
});

const mapDispatchToProps = (dispatch) => ({
	getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
