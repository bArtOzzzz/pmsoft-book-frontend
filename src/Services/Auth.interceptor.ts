import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import TokensModel from "../Models/TokensModel";
import RefreshTokenModel from "../Models/RefreshTokenModel";

export const useAxiosRequest = () => {  
    const axiosRequest = () => {
      axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
  
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("successfull request!");
        }
  
        return config;
      });
    };
  
    return axiosRequest;
};

export const useAxiosResponse = () => {
    const navigate = useNavigate();
  
    const refreshValues: RefreshTokenModel = {
        id: '',
        accessToken: '',
        refreshToken: ''
    };
  
    const axiosResponse = () => {
        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    const accessToken = localStorage.getItem('token');
                    const decodedToken = jwt_decode(accessToken!) as TokensModel;
                    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

                    const refreshToken = await axios.get('https://localhost:7196/api/Authentication/GetRefreshTokenByUser/' + userId);

                    if (refreshToken) {
                        const RefreshToken = (values: RefreshTokenModel) => {
                            values.id = userId;
                            values.accessToken = accessToken!;
                            values.refreshToken = refreshToken.data;
                        }

                        RefreshToken(refreshValues);
                    }

                    const accessTokenResponse = await axios.post('https://localhost:7196/api/Authentication/RefreshToken', refreshValues);
                    const newAccessToken = accessTokenResponse.data;
                    localStorage.setItem('token', newAccessToken);

                    return axios(originalRequest);
                }
                else if (error.response.status === 403 && !originalRequest._retry) { 
                  alert("Oops... seems like you have no premissions for this action!");
                  navigate("/home");
                }
            
                return Promise.reject(error);
            }
        );
    };
  
    return axiosResponse;
};