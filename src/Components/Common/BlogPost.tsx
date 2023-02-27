import "./Style/BlogPost.css";

const BlogPost = () => {
  return (
    <>
      <div className="BlogPost_Wrapper">
        <div className="BlogPost_Container">
          <div className="BlogPostImage_Container">
            <img
              className="BlogPostImage"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="TitleImage"
            />
          </div>
          <div className="BlogPostBody_Container">
            <h1>title</h1>
            <p>content</p>
            <div className="BlogPostInfo_Container">
            <span>2022년 02월 28일</span>
            <span>0개 댓글</span>
            </div>
          </div>
          <div className="BlogPostWriter_Container">
            <span>글쓴이</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
