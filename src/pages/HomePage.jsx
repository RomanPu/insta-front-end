
import { LogedUser } from "../cmps/LogedUser";
import { NavBar } from "../cmps/NavBar";
import { PostsList } from "../cmps/PostsList";
import { SuggestedFriends } from "../cmps/SuggestedFriends";


export function HomePage() {
    return (
        <section className="home-page">
            <section className="posts-section">
                <SuggestedFriends type = {"top"}/>
                <PostsList />
            </section>
            <section className="side-bar">
                <LogedUser/>
                <SuggestedFriends />
            </section>
        </section >
    )
}

