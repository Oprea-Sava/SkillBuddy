import React from "react";
import './css/signIn.css';

export default function SignIn(){
    return(
        <div className="container__si">
            <div className="banner__si">
                <div className="bannerImg__si"></div>
                <div className="bannerText__si">
                    <div className="bannerTitle__si">Welcome to SkillBuddy</div>
                    <div className="bannerContent__si">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                </div>
            </div>
            <div className="signInBox">
                <div className="logo__si">
                    <img src="" alt="logo"></img>
                    <div className="home__si">
                        <a href="/">Back To Home</a>
                    </div>
                </div>
                <h1>Login into your account</h1>
                <form id="signInForm">
                    <div className="formGroup__si">
                        <label className="formLabel__si">Username or Email Address</label>
                        <input type="text" name="name" className="formInput__si" required/>
                    </div>
                    <div className="formGroup__si">
                        <label className="formLabel__si">Password</label>
                        <input type="password" name="pwd" className="formInput__si" required/>
                    </div>
                    <div className="formGroupCheck__si">
                        <div className="remember__si">
                            <input type="checkbox" className="formCheck__si"/>
                            <label className="rememberLabel__si">
                                Remember Me
                            </label>
                        </div>
                        <div className="forgot__si">
                            <span>
                                <a href="/">Forgot Password?</a>
                            </span>
                        </div>
                    </div>
                    <div className="submit__si">
                        <button type="submit" className="submitButton__si">Login</button>
                    </div>
                </form>

            </div>
        </div>
    );
}