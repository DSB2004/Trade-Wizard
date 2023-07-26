import React from 'react'
// import Strategy from 'passport-google-oauth20'
import axios from 'axios'
import passport from 'passport'
export default function Google() {
    // AIzaSyDzi3f4L4aAruziZd2P4c6bY65Dc_VyrhA API KEY 
    axios.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] }));

    axios.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    return (
        <></>
    )
}
