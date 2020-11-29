import React from 'react';
import './styles.scss';
import Nav from '../../components/nav/Nav';
import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom'; 

const ViewPost = () => {
    const { username, postID } = useParams<{ username: string, postID: string}>();

    return (
        <React.Fragment>
            <Nav/>
            <div className="view-post">
                <div className="view-post__timeline">
                    <Post repost="false" profileURL="https://picsum.photos/100/100" username="Gabe" date="15m" message="Vivamus cursus magna nec volutpat viverra. Vivamus at porta ligula. Pellentesque consectetur, risus sed semper vehicula, arcu urna hendrerit neque."/>
                    <div className="view-post__replies">
                        <div className="view-post__reply">
                            <div className="view-post__reply__line"></div>
                            <Post repost="false" profileURL="https://picsum.photos/100/100" username="Gabe" date="15m" message="Vivamus cursus magna nec volutpat viverra. Vivamus at porta ligula. Pellentesque consectetur, risus sed semper vehicula, arcu urna hendrerit neque."/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ViewPost;