import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import PostContext from "../context/post/postContext";
import Spinner from "./Spinner";

const gridItem = () => {
  const postContext = useContext(PostContext);
  const { posts, getPosts } = postContext;
  useEffect(() => {
    getPosts();
  }, [posts]);

  const [show, setShow] = useState(false);
  const [post, setPost] = useState(0);

  const hideModal = () => {
    setShow(!show);
  };
  const showPost = (post) => {
    setShow(!show);
    setPost(post);
  };
  if (posts === null) return <Spinner />;
  else
    return (
      <div className="bottom-container">
        <div className="image-container">
          {posts.map((post, i) => (
            <div className="cardgrid" key={i} onClick={() => showPost(post)}>
              <img
                src={post.url}
                key={i}
                alt="sems"
                className="cardgrid__img"
                onContextMenu={(e) => {
                  if (e.button === 2) e.preventDefault();
                }}
              ></img>
              <div className="cardgrid__info">
                <span className="cardgrid__category"> {post.title}</span>
                <h3 className="cardgrid__title">{post.country}</h3>
              </div>
            </div>
          ))}
        </div>

        <Modal show={show} post={post} hideModal={hideModal}></Modal>
      </div>
    );
};

export default gridItem;
