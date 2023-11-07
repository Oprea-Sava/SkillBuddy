import React from "react";
import './css/signUp.css'

export default function SignUp(){
    return(
        <div className="container__su">
            <div className="banner__su">
                <div className="bannerImg__su"></div>
                <div className="bannerText__su">
                    <div className="bannerTitle__su">Welcome to SkillBuddy</div>
                    <div className="bannerContent__su">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                </div>
            </div>
            <div className="signUpBox">
                <div className="logo__su">
                    <img src="" alt="logo"></img>
                    <div className="home__su">
                        <a href="/">Back To Home</a>
                    </div>
                </div>
                <h1>Login into your account</h1>
                <form id="signUpForm">
                    <div className="formName__su">
                        <div className="formGroup__su">
                            <label className="formLabel__su">First Name</label>
                            <input type="text" name="name" className="formInput__su" required/>
                        </div>
                        <div className="formGroup__su">
                            <label className="formLabel__su">Last Name</label>
                            <input type="text" name="name" className="formInput__su" required/>
                        </div>
                    </div>
                    <div className="formGroup__su">
                        <label className="formLabel__su">Username</label>
                        <input type="text" name="name" className="formInput__su" required/>
                    </div>
                    <div className="formGroup__su">
                        <label className="formLabel__su">Email Address</label>
                        <input type="text" name="name" className="formInput__su" required/>
                    </div>
                    <div className="formGroup__su">
                        <label className="formLabel__su">Password</label>
                        <input type="password" name="pwd" className="formInput__su" required/>
                    </div>
                    <div className="formGroup__su">
                        <label className="formLabel__su">Confirm Password</label>
                        <input type="password" name="pwd" className="formInput__su" required/>
                    </div>
                    <div className="submit__su">
                        <button type="submit" className="submitButton__su">Create Account</button>
                    </div>
                </form>

            </div>
        </div>
    );
}