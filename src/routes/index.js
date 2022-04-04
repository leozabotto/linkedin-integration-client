import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { LinkedInCallback } from "react-linkedin-login-oauth2";

/* PAGES */
import Auth from "../pages/Auth";
import NewPost from "../pages/NewPost";

export default function ApplicationRoutes () {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/new-post" element={<NewPost /> } />
        <Route path="/linkedin" element={<LinkedInCallback />} />
        <Route path="*" element={<h1> NOT FOUND </h1>} />
      </Routes>
    </Router>
  )
}