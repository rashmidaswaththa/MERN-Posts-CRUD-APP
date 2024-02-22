const Post = ({ post , children }) => {
  return (
    <div className="mb-4">
      <div className="card ring-1 ring-indigo-200">
        <div className="flex item-start justify-between">
          <div>
            <h2 className="post-title">{post.title}</h2>
            <p className="italic text-gray-400 text-xs">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>{children}</div>
        </div>

        <p className="post-body">{post.body}</p>
      </div>
    </div>
  );
};

export default Post;
