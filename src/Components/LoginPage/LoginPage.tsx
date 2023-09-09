import "./LoginPage.style.css";

const LoginPage = () => {
    return (
        <>
        <form action="">
            <p className="title-login">Login</p>
            <div className="container">
                <div className="email-container">
                    <input type="text" placeholder="Email" name="email" />
                </div>
                <div className="password-container">
                    <input type="password" placeholder="Password" name="password"/>
                </div>
                <button className="submit-btn" type="submit">Submit</button>
            </div>
        </form>
        </>
    )
}

export default LoginPage;