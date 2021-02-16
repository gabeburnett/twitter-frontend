import React, { useState, useEffect } from 'react';
import './styles.scss';
import { IPost } from '../../utils';
import Post from '../post/Post';
import { getJSON } from '../../utils';

/**
 * Types of timelines.
 */
export enum TimelineType {
    Home,
    Profile,
    ProfileLikes,
    Search,
}

/**
 * Represents a post timeline. 
 */
export default (props: { type: TimelineType, username?: string, keywords?: string }) => {
    const [posts, setPosts] = useState([] as IPost[]);
    const [statusMsg, setStatusMsg] = useState("");
    const [showMore, setShowMore] = useState(false);

    /**
     * Makes a request for more posts, manages the load more button and status messages.
     */
    const loadPosts = () => {
        setShowMore(false);
        let path = null;
        switch (props.type) {
            case TimelineType.Profile:
                path = "/api/profile/posts?" + new URLSearchParams({ username: props.username!, lastDate: getLastDate()});
                break;
            case TimelineType.ProfileLikes:
                path = "/api/profile/likes?" + new URLSearchParams({ username: props.username!, lastDate: getLastDate()});
                break;
            case TimelineType.Home:
                path = "/api/timeline?" + new URLSearchParams({ lastDate: getLastDate()});
                break;
            case TimelineType.Search:
                path = "/api/search?" + new URLSearchParams({ keywords: props.keywords!, lastDate: getLastDate()});
                break;
        }
        if (path) {
            getJSON(path)
            .then((res) => res.json())
            .then((res: IPost[]) => {
                let newPosts = [...posts];
                if (hasDuplicatePost(posts, res)) {
                    newPosts.pop();
                }

                newPosts.push(...res);
                setPosts(newPosts);

                if (res.length === 10) {
                    setShowMore(true);
                } else if (posts.length === 0) {
                    setStatusMsg("We couldn't find any posts.");
                }
            });
        }
    }

    /**
     * Get the date of the last post loaded.
     */
    const getLastDate = (): string => {
        if (posts.length > 0) {
            return posts[posts.length - 1].rawDate;
        }
        return "";
    }

    /**
     * Load posts on component startup.
     */
    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div className="timeline">
            {posts.map((post: IPost) => 
                <Post key={post.pid + "-" + post.uid} data={post}/>
            )}
            {showMore && <button className="btn btn-thin more" onClick={() => loadPosts()}>Show more</button>}
            {statusMsg.length !== 0 && <div className="status-msg">{statusMsg}</div>}
        </div>
    );
}

/**
 * Returns whether the last post currently loaded and the 
 * first post of the new posts is the same.
 * @param currentPosts Current loaded posts.
 * @param newPosts New posts to be loaded.
 */
const hasDuplicatePost = (currentPosts: IPost[], newPosts: IPost[]) => {
    if (currentPosts.length > 0 && newPosts.length > 0) {
        const lastPost = currentPosts[currentPosts.length - 1];
        const firstPost = newPosts[0];
        if (lastPost.pid === firstPost.pid && lastPost.uid === firstPost.uid) return true;
    }
    return false;
}