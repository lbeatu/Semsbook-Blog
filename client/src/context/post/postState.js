import React, { useReducer } from "react";
import PostContext from "./postContext";
import PostReducer from "./postReducer";
import axios from "axios";
import {
  GET_POSTS,
  ADD_POSTS,
  DELETE_POSTS,
  POST_ERROR,
  SET_LOADING,
} from "../types";
const postState = (props) => {
  const initialState = {
    posts: null,
    current: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const addPost = async (post) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      // eslint-disable-next-line
      setLoading();
      const res = await axios.post("/api/posts", post, config);
      console.log("addPost -> res", res);

      dispatch({
        type: ADD_POSTS,
        payload: post, //response
      });
    } catch (error) {
      console.log("addPost -> error", error);
      dispatch({
        type: POST_ERROR,
        payload: error.response.msg,
      });
    }
  };
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      console.log("getPosts -> error", error);
      dispatch({
        type: POST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const deletePost = async (id) => {
    // eslint-disable-next-line
    setLoading();
    try {
      console.log(id);
      await axios.delete(`/api/posts/d/${id}`);

      dispatch({
        type: DELETE_POSTS,
        payload: id,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };
  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        error: state.error,
        loading: state.loading,
        addPost,
        getPosts,
        deletePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default postState;
