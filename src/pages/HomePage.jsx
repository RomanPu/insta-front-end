
import { Outlet } from "react-router";
import { LogedUser } from "../cmps/LogedUser";
import { PostsList } from "../cmps/PostsList";
import { SuggedestedFriends } from "../cmps/SuggedestedFriends";
import { userService } from "../services/user.service";
// import { userService } from "../services/user.service";

export function HomePage() {

    userService.createUsers()

    return (
        <div className="home-page-conteiner">
            <section className="home-page">
                <section className="posts-section">
                    <PostsList />
                </section>
                <section className="side-bar">
                    <LogedUser/>
                    <SuggedestedFriends />
                </section> 
                <Outlet/>           
            </section >
        </div>
    )
}

