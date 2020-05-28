import React from "react";

const Modal = ({ show, post, hideModal }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="card">
          <div className="title">
            <a>{post.title}</a>
            <p>{post.date}</p>
          </div>
          <div className="context" onClick={hideModal}>
            <div className="imgBx" onClick={hideModal}>
              <img
                src={post.url}
                alt="images"
                onContextMenu={(e) => {
                  if (e.button === 2) e.preventDefault();
                }}
              ></img>
            </div>
            <div className="details">
              <i class="fas fa-ellipsis-h"></i>
              <p>{post.context}</p>
              <a>{post.creator}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modal;
/**
  <div className="card-comment">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(comments);
              }}
            >
              <input
                autoComplete="off"
                type="text"
                name="comment"
                placeholder="Add comment on post"
                onChange={(e) => {
                  setComment({ ...comment, [e.target.name]: e.target.value });
                }}
              ></input>

              <p>inim veniam, quis nostrud exercitation ullamco labo</p>
              <p>lpa qui officia deser</p>
              <p>nice foto</p>
              <p>
                nisi ut aliasdaquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deser
              </p>
            </form>
          </div>
 */
