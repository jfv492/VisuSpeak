import './VisuSpeak.css';
import Header from './Header';
import Footer from './Footer';

export default function Login() {
    return (
      <div>
        <Header />

        <body className = "bodyPadding page-bgcolour"  style = {{backgroundColor: "#f0f0f0"}}> 
          <div>
            <h1 className = "centered heading" style = {{fontSize: 40}}> <b> Sign Up </b></h1>
          </div>

          <div className = "login-grid-container spaceBetweenBodyItems">
            <div></div>
            <div>
              <form className = "spaceBetweenBodyItems">
                <label for = "fname"> First Name: </label>
                <input type = "text" id = "fname" name = "fname" className='textbox'></input>
                <br></br>
                <br></br>
                <label for = "lname"> Last Name: </label>
                <input type = "text" id = "lname" name = "lname" className='textbox'></input>
                <br></br>
                <br></br>
                <label for = "email"> Email: </label>
                <input type = "text" id = "email" name = "email" className='textbox'></input>
                <br></br>
                <br></br>
                <label for = "password">Password: </label>
                <input type = "text" id = "password" name = "password"></input>
                <br></br>
                <br></br>
                <label for = "confirmpwd">Confirm Password: </label>
                <input type = "text" id = "confirmpwd" name = "confirmpwd"></input>
                <br></br>
                <br></br>
                <input type = "Checkbox" id = "terms" name = "terms"></input>
                <label for = "terms" className='terms-label'>Do you agree with the the Terms and Conditions? </label>
                <br></br>
                <br></br>
                <label for = "submit"></label>
                <input type = "submit" value = "Sign Up"></input>
              </form>  
            </div>
            <div></div>
          </div>       
        </body>
        
        <Footer />
      </div>
    );
  }