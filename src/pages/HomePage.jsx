
import { Outlet } from "react-router";
import { LogedUser } from "../cmps/LogedUser";
import { PostsList } from "../cmps/PostsList";
import { SuggestedFriends } from "../cmps/SuggestedFriends";

export function HomePage() {
    return (
        <div className="home-page-conteiner">
            <section className="home-page">
                <section className="posts-section">
                    {/* <SuggestedFriends type = {"top"}/> */}
                    <PostsList />
                </section>
                <section className="side-bar">
                    <LogedUser/>
                    <SuggestedFriends />
                </section> 
                <Outlet/>           
            </section >
        </div>
    )
}

