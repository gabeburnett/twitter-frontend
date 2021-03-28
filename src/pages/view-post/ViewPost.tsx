import React, { useEffect, useState } from 'react';
import './styles.scss';
import Nav from '../../components/nav/Nav';
import Post from '../../components/post/Post';
import { useHistory, useParams } from 'react-router-dom'; 
import { jsonRequest, IPost } from '../../utils';

/**
 * Represents the viewing of a post and its comments.
 */
const ViewPost = () => {
    const { username, pid } = useParams<{ username: string, pid: string}>();
    const [opPost, setOPPost] = useState(null as IPost | null);
    const [comments, setComments] = useState([] as IPost[]);
    const [showMore, setShowMore] = useState(false);
    const history = useHistory();

    /**
     * Makes a request for comments and the main post being viewed.
     */
    const loadComments = () => {
        setShowMore(false);
        jsonRequest("GET", "/api/post/" + pid + "/" + username + "/?" + new URLSearchParams({ lastDate: getLastDate() }))
        .then((res) => {
            if (res.status === 404) {
                history.replace("/not-found");
            }
            console.log(res);
            return res.json();
        })
        .then((res: { op?: IPost, comments: IPost[], error?: string }) => {
            if (!res || res.error) return;
            
            const newComments = [...comments];
            if (hasDuplicatePost(comments, res.comments)) {
                newComments.pop();
            }
            newComments.push(...res.comments);
            setComments(newComments);

            if (res.op) {
                if (res.op.comments < comments.length) {
                    res.op.comments = comments.length;
                }
                setOPPost(res.op);
            }

            if (res.comments.length === 10) {
                setShowMore(true);
            }
        });
    }

    /**
     * Gets the posted date of the last comment, or an empty
     * string if there's no comments.
     */
    const getLastDate = (): string => {
        if (comments.length > 0) {
            return comments[comments.length - 1].rawDate;
        }
        return "";
    }

    /**
     * Load the post and its comments.
     */
    useEffect(() => {
        loadComments();
    }, []);

    return (
        <React.Fragment>
            <Nav/>
            <div className="setup-page view-post">
                <div className="setup-page__centre view-post__timeline">
                    {opPost && <Post data={opPost as IPost}/>}
                    <div className="view-post__replies">
                        {comments.map((comment: IPost) => 
                            <div className="view-post__reply" key={comment.pid + ":" + comment.uid}>
                                <div className="view-post__reply__line"></div>
                                <Post data={comment}/>
                            </div>
                        )}
                    </div>
                    {showMore && <button className="btn btn-thin more" onClick={() => loadComments()}>Show more</button>}
                </div>
            </div>
        </React.Fragment>
    );
}

export default ViewPost;

/**
 * Returns whether the last comment currently loaded and the 
 * first comment of the new comments is the same.
 * @param currentPosts Current loaded comments.
 * @param newPosts New comments to be loaded.
 */
const hasDuplicatePost = (currentPosts: IPost[], newPosts: IPost[]) => {
    if (currentPosts.length > 0 && newPosts.length > 0) {
        const lastPost = currentPosts[currentPosts.length - 1];
        const firstPost = newPosts[0];
        if (lastPost.pid === firstPost.pid && lastPost.uid === firstPost.uid) return true;
    }
    return false;
}