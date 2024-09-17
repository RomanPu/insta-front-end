
import { LogedUser } from "../cmps/LogedUser";
import { PostsList } from "../cmps/PostsList";

export function HomePage() {
    return (
        <section>
            <h1>Home sweet Home</h1>
            <PostsList />
            {/* <LogedUser/> */}
        </section >
    )
}

