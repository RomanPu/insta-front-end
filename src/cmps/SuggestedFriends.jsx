export function SuggestedFriends( {type = ""} ) {
    return (
        <section className={type === "top" ? "suggested-top": "suggested-side" }>
            <h1>Suggested Friends</h1>
        </section >
    )
}