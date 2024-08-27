
import './SignUp.css';
import s1 from '../../assets/images/login/loginpage.png';
import {useNavigate} from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={s1} alt="Signup" />
            </div>
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" placeholder="Enter your username"/>
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email"/>
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password"/>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className={'flex'}><h6>already have an account?</h6> {/* Fixed typo in "Don’t" */}
                    <button
                        type="button" // Add type="button" to prevent form submission
                        className="SignUp-Button -mt-4" // New class name for the Sign Up button
                        onClick={() => navigate('/login')} // Corrected onClick handler
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
