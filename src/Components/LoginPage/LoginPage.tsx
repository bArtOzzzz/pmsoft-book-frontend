const LoginPage = () => {
    return (
        <>
        <form action="">
            <div className="add-book-container">
            <p className="title">Login</p>
            <div className="container">
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password"/>
                <button className="submit-btn" type="submit">Submit</button>
            </div>
            </div>  
        </form>
        </>
    )
}

export default LoginPage;