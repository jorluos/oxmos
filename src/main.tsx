
  import { createRoot } from "react-dom/client";
  import App from "./app/App";
  import "./styles/index.css";
  import axios from './axios';

  console.log('Axios baseURL en main:', axios.defaults.baseURL);

  createRoot(document.getElementById("root")!).render(<App />);
  
