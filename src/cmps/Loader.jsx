export function Loader( isLoading) {
    console.log('isLoading:', isLoading)
    return ( 
        isLoading && 
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    )
}
