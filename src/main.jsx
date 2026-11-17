import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/components.css";
import App from "./App.jsx";
import {AuthProvider} from "@/context/AuthContext";
import {AppDataProvider} from "@/context/AppDataContext";
import {NotificationProvider} from "@/context/NotificationContext";
import {ToastProvider} from "@/context/ToastContext";
ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode><ToastProvider><AuthProvider><NotificationProvider><AppDataProvider><App/></AppDataProvider></NotificationProvider></AuthProvider></ToastProvider></React.StrictMode>
);
