import { useState, createContext } from "react";

export const PostContxt = createContext();

const PostProvider = ({children}) => {
    const [posts , setPosts] = useState([]);

    return(
        <PostContxt.Provider value={{posts , setPosts}}>
            {children}
        </PostContxt.Provider>
    )
}

export default PostProvider;