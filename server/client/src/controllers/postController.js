// -------------Get Posts--------------------

const getPosts = async () => {

    const res = await fetch('/api/posts/display');
    const data = await res.json();
    if(!res.ok){
        throw Error(data.error)
    }

    return data;

}

//---------------------Get User Posts-----------------

const getUserPosts = async () => {

    const res = await fetch('/api/posts/displayAll/user', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    const data = await res.json();

    if(!res.ok){
        throw Error(data.error)
    }

    return data;
    
}

//------------------------------Create New Post-------------------------------------

const createPost = async (title , body) => {

    if(!title || !body) {
        throw Error("All the fields required..")
    }

    const res = await fetch('/api/posts/create' , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({title , body})
    });
    const data = await res.json();

    if(!res.ok){
        throw Error(data.error)
    }

    return data;


}

//-------------------------------------------Delete Post------------------------

const deletePost = async (_id) => {
    const res = await fetch(`/api/posts/delete/${_id}`,  {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    if(!res.ok){
        throw Error(data.error)
    }

    return data;
}

//-------------------------------------------Update Post------------------------

const updatePost = async (_id , title , body) => {

    if(!title || !body) {
        throw Error("All the fields required..")
    }

    const res = await fetch(`/api/posts/update/${_id}`,  {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({title , body})
    })
    const data = await res.json();

    if(!res.ok){
        throw Error(data.error)
    }

    return data;
}


export {getPosts , getUserPosts , createPost , deletePost , updatePost}
