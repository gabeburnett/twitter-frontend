import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

/**
 * Represents a post, with all the required data.
 */
export interface IPost {
    pid: number;
    uid: number;
    username: string;
    profileURL: string;
    date: string;
    rawDate: string;
    message: string;
    likes: number,
    reposts: number,
    comments: number,
    hasLiked: boolean,
    hasReposted: boolean,
    isRepost?: boolean,
    repostUsername?: string
}

/**
 * Represents the core data needed to display a user's profile.
 */
export interface IProfile {
    backgroundURL: string;
    description: string;
    followers: string;
    isFollowing: boolean;
    profileURL: string;
    username: string;
}

const useComponentVisible = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}

export { useComponentVisible };

const jsonRequest = (method: string, path: string, body?: any) => (
    fetch(process.env.REACT_APP_API_HOST + path, {
        method,  
        credentials: "include",
        headers: {
            "Accept": "*",
            "Authorization": "Bearer " + Cookies.get("jwtToken"),
            "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body)
    })
);

export { jsonRequest };