import './VisuSpeak.css';
import logo from './images/VisuSpeak_Logo.jpeg';
import whiteLogo from './images/VisuSpeak_Logo_White.png';

function Header() {
  return (
    <div className = "header">
      <div class="heading-grid-container">
        <div class="grid-item">
          <img src={logo} alt="VisuSpeak Logo" height="70"/>
        </div>
        <div class="grid-item"></div>
        <div class="grid-item">Home</div>  
        <div class="grid-item">ASL Resources</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className = "footer">
      <div class="grid-container">
        <div class="grid-item">
          <img src={logo} alt="VisuSpeak Logo" height="70"/>
        </div>
        <div class="grid-item"></div>
        <div class="grid-item">Home</div>  
        <div class="grid-item">ASL Resources</div>
      </div>
    </div>
  );
}

export default function MyApp() {
  return (
    <div>
      <Header />
      <body className = "bodyPadding"> 
        <div>
          <h1 className = "centered heading" style = {{fontSize: 50}}> <b> Welcome to VisuSpeak </b></h1>
          <h1 className = "centered heading" style = {{fontWeight: 300}}> Your ASL Companion </h1>

          <div class="button-grid-container centered">
            <div class="grid-item"></div>
            <div class="grid-item">
              <button className = "button">Login</button>
            </div>
            <div class="grid-item">
              <button className = "button">Sign Up</button>
            </div>  
            <div class="grid-item"></div>
          </div>
        </div>
        
        <div class="grid-container centered">
            <div> </div>
            <div class="grid-item">
              <p style = {{backgroundColor: "#000000"}}>Login</p>
            </div>
            <div class="grid-item">
              <p style = {{backgroundColor: "#000000"}}>Sign Up</p>
            </div>  
            <div> </div>
        </div>

      </body>
      
      <Footer />
    </div>
  );
}