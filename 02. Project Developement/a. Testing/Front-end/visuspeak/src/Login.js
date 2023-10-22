import './VisuSpeak.css';
import Header from './Header';
import Footer from './Footer';

export default function Login() {
    return (
      <div>
        <Header />

        <body className = "bodyPadding page-bgcolour"  style = {{backgroundColor: "#f0f0f0"}}> 
          <div>
            <h1 className = "centered heading" style = {{fontSize: 40}}> <b> Login </b></h1>
          </div>

          <div className = "login-grid-container spaceBetweenBodyItems">
            <div></div>
            <div>
              <form className = "spaceBetweenBodyItems">
                <label for = "uname"> Username or Email: </label>
                <input type = "text" id = "uname" name = "uname" className='textbox'></input>
                <br></br>
                <br></br>
                <label for = "password">Password: </label>
                <input type = "text" id = "password" name = "password"></input>
                <br></br>
                <br></br>
                <label for = "submit"></label>
                <input type = "submit" value = "Login"></input>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <label for = "signup">Click here to Sign Up: </label>
                <input type = "button" value = "Sign Up"></input>
              </form>  
            </div>
            <div></div>
          </div>       
        </body>
        
        <Footer />
      </div>
    );
  }