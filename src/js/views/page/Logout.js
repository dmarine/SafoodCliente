import { Error404 } from "./Error404.js";
import { logout } from "../../api/LoginAPI.js";

let Logout = {
    render: async () => {
    },
    renderMenu: async () => {
    },
    after_render: async () => {
        logout()
    }
  };
  
  export { Logout };
  