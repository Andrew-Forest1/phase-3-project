import Comments from './Comments'
import React, { useState, useContext } from 'react'
// import { AppContext } from "../App"

function Post({post, setComments, setPosts, user}){
    const [comment, setComment] = useState(false)
    const [heart, setHeart] = useState(true)


    const handleClick = (post) => {
        if (heart){
            setHeart(currentValue => !currentValue)
            // post.likes += 1
            fetch(`http://localhost:9393/posts/${post.id}/increment`, {
                method: "PATCH",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
        .then(res => res.json())
        .then(post => {
            setPosts((current) => {
                const postId = current.findIndex(ele => ele.id === post.id)
                return [...current.slice(0, postId), post, ...current.slice(postId + 1)]
            })
        })
        // debugger
        } else {
            setHeart(currentValue => !currentValue)
            // post.likes -= 1
            fetch(`http://localhost:9393/posts/${post.id}/decrement`, {
                method: "PATCH",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({post})
            })
        .then(res => res.json())
        .then(post => {
            setPosts((current) => {
                const postId = current.findIndex(ele => ele.id === post.id)
                return [...current.slice(0, postId), post, ...current.slice(postId + 1)]
            })
        })
        }
    }

    return(
        
        <div className="post">
            <h2 className="text">{post.username}</h2>
            <img className="image" src={post.image} alt="post"/>
            <p className='likes'>
                <button className="heart" onClick={() => handleClick(post)} value={heart}>{heart ? '🖤' : '💗'}</button>
            {post.likes}
            <button className='commentButton' onClick={() => setComment(currentValue => !currentValue)} value={comment}>💭</button>
            </p>
            <p className='caption'>{post.caption}</p>
            <p className='posted'>Posted: {post.date.slice(0, 10)}</p>
            {comment ? <Comments comment={comment} setComment={setComment} comments={post.comments} post={post} user={user} setPosts={setPosts}/> : null}
        </div>
    )
}

export default Post