import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postController";
import {PostContxt} from '../../contexts/PostContext';
import Post from "../../components/Post";
const Home = () => {

    //Use Post Context
    const{posts , setPosts} = useContext(PostContxt)

    //loading effect
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async() => {
            const data = await getPosts();
            setPosts(data.posts);
            setLoading(false);
        } , 1000)
    }, [])

    console.log(posts);

    return(
        <section className="card">
            <h1 className="title">Latest Posts</h1>

            {loading && <p><i className="fa-solid fa-spinner animate-spin text-center text-3xl block"></i></p>}
            {posts && posts.map((post) => <div key={post.id}>
                <Post post={post}></Post>
            </div>)}
        </section>
    )
}

export default Home;