import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/auth`
    });
  }

  signup(data) {
    return this.api.post("/signup", data);
  }

  login(data) {
    return this.api.post(`/login`, data);
  }

  verify(token) {
    return this.api.get(`/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getUser(token){
    return this.api.get("/get-user", {
      headers: { Authorization: `Bearer ${token}`}
    })
  }
}

const authService = new AuthService();

export default authService;