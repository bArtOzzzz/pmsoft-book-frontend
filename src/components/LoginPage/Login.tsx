import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => { 
    const navigate = useNavigate();

    const onSubmit = (e: any) =>  {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        axios.post('https://localhost:7196/api/Authentication/Login', data)
        .then(response => {
            localStorage.setItem("accessToken", response.data.accessToken);

            if (response) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
            }

            navigate("/");
            window.location.reload()

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <form action="" onSubmit={onSubmit}>
            <div className="add-book-container">
            <p className="title">Login</p>
            <div className="container">
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password"/>
                <button className="submit-btn" type="submit">Submit</button>
            </div>
            </div>
        </form>
    )
}

export default Login;