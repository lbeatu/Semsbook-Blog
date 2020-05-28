import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PostContext from "../context/post/postContext";
const Write = () => {
  const postContext = useContext(PostContext);

  const {
    addPost,
    getPosts,
    deletePost,
    current,
    posts,
    loading,
  } = postContext;

  const [img, setImg] = useState(
    "https://media.giphy.com/media/Pkck2unt0XQfc4gs3R/giphy.gif"
  );
  const [startDate, setStartDate] = useState(new Date());

  const [post, setPost] = useState({
    title: "",
    country: "",
    img: "",
    context: "",
    creator: "",
    date: "",
    file: "",
  });
  let formData = new FormData();

  useEffect(() => {
    getPosts();
    setPost({
      ...post,
    });
    if (current !== null) setPost(current);
  }, [posts]);

  const onChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      date: startDate.toDateString(),
    });
    console.log("onChange -> post", post, current);
  };

  const onClick = (e) => {
    console.log(posts, e.target.value);

    deletePost(e.target.value);
  };
  //add post add database
  const onAddPost = (e) => {
    formData.append("title", post.title);
    formData.append("country", post.country);
    formData.append("context", post.context);
    formData.append("creator", post.creator);
    formData.append("file", post.file);
    formData.append("date", post.date);
    console.log("onAddPost -> formData", formData, post);
    //getPosts();
    if (current === null) {
      addPost(formData);
      console.log("onSubmit -> post", post);
    } else {
      console.log("err");
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPost({ file: file });
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const { title, country, context, creator } = post;
  let $imagePreview = null;
  return (
    <div className="write-container">
      <p>Post Managment</p>
      <div className="write-content">
        <label> Select image: </label>
        <div className="write-upload">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input type="file" name="file" onChange={handleImageChange} />
          </form>
          {!$imagePreview && <img src={img} alt="img" />}
        </div>

        <label>Context:</label>
        <textarea
          type="text"
          name="context"
          placeholder="Context"
          value={context}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="write-content">
        <label className="datepicker-label">Date:</label>
        <DatePicker
          setFocus
          selected={startDate}
          dateFormat="MMMM d, yyyy"
          onChange={(date) => {
            setStartDate(date);
            setPost({
              ...post,
            });
          }}
          name="date"
        />

        <label>Country:</label>
        <input
          type="text"
          name="country"
          placeholder="Paris , İstanbul"
          value={country}
          onChange={onChange}
        ></input>
      </div>
      <div className="write-content">
        <label>Creator:</label>
        <input
          type="text"
          name="creator"
          placeholder="Context"
          onChange={onChange}
          value={creator}
        ></input>

        <label>Where i am:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Ayasofia.. Eifell. "
        ></input>
        <button type="submit" onClick={onAddPost}>
          {!loading ? "Publish Post" : "Published"}
        </button>
      </div>

      {posts !== null ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Creator</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={i}>
                <td>{post.date}</td>
                <td>{post.title}</td>
                <td>{post.creator}</td>
                <td>
                  <img src={post.url} alt="edit" key={i} />
                </td>
                <td>
                  <button onClick={onClick} value={post._id}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Fetcing Data"
      )}
    </div>
  );
};

export default Write;
