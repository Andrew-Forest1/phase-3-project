import { useState } from "react"

function CreateComment({post, user, setPosts}){
    const [sendCom, setSendCom] = useState({
        comment: "",
        username: user.username,
        post_id: post.id,
    })

    // useEffect(() => {
    //     setSendCom({
    //         comment: "",
    //         username: user.username,
    //         post_id: post.id,
    //     })
    // }, []);


    const handleChange = (e) => {
        setSendCom((currentUser) => (
            {...currentUser, [e.target.name]: e.target.value}
        ))
    }

    const handleComment = (e) => {
        e.preventDefault()
        // debugger
        fetch(`http://localhost:9393/comments`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(sendCom)
        })
        .then(resp => resp.json())
        .then(post => {
            setPosts(current => {
                const postId = current.findIndex(ele => ele.id === post.id)
                const newPost = {...current[postId]}.comments.push(sendCom.comment)
                // debugger
                return [...current.slice(0, postId), newPost, ...current.slice(postId + 1)]
            })
        })

        setSendCom({
            comment: "",
        })
    }

    return (
        <div className="comBox">
            <form className='input' onSubmit={handleComment}> 
                <input className='commentInput' name="comment" type="comment" placeholder='Add a comment' onChange={handleChange} value={sendCom.comment}/>
                <button className='inputButton' type="submit" onClick={CreateComment}> send </button>
            </form>
        </div>
 
    )
}

export default CreateComment