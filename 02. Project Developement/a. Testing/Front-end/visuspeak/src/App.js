import './VisuSpeak.css';
import filler from './images/FillerPhoto.jpg';

import Header from './Header';
import Footer from './Footer';
import Login from './Login';

export default function MyApp() {
  return (
    <div>
      <Header />
      <body className = "bodyPadding"> 
        <div>
          <h1 className = "centered heading" style = {{fontSize: 50}}> <b> Welcome to VisuSpeak </b></h1>
          <h1 className = "centered heading" style = {{fontWeight: 300}}> Your ASL Companion </h1>

          <div class="button-grid-container">
            <div class="grid-item"></div>
            <div class="grid-item">
            <button className = "button">Log in</button>
            </div>
            <div class="grid-item">
              <button className = "button">Sign Up</button>
            </div>  
            <div class="grid-item"></div>
          </div>
        </div>
        
        <div class="grid-container spaceBetweenBodyItems">
            <div> </div>
            <div class="grid-item">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis 
                lectus nulla at. Arcu dictum varius duis at. Arcu non odio euismod lacinia at quis risus sed. Mollis nunc sed id semper risus in. Aliquam sem fringilla ut morbi 
                tincidunt augue interdum velit euismod. Lectus mauris ultrices eros in cursus. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Ultrices gravida dictum 
                fusce ut placerat orci nulla. Diam maecenas ultricies mi eget mauris pharetra et. Sem nulla pharetra diam sit amet nisl suscipit. Platea dictumst quisque sagittis purus 
                sit amet volutpat consequat. Cursus in hac habitasse platea dictumst. Morbi enim nunc faucibus a.
              </p>
            </div>
            <div class="grid-item"></div>
            <div class="grid-item centered">
              <img src={filler} alt="VisuSpeak Logo"width = "500"/>
            </div>  
            <div> </div>
        </div>

        <div class="grid-container spaceBetweenBodyItems">
            <div> </div>
            <div class="grid-item centered">
              <img src={filler} alt="VisuSpeak Logo"width = "500"/>
            </div>
            <div class="grid-item"></div>
            <div class="grid-item">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis 
                lectus nulla at. Arcu dictum varius duis at. Arcu non odio euismod lacinia at quis risus sed. Mollis nunc sed id semper risus in. Aliquam sem fringilla ut morbi 
                tincidunt augue interdum velit euismod. Lectus mauris ultrices eros in cursus. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Ultrices gravida dictum 
                fusce ut placerat orci nulla. Diam maecenas ultricies mi eget mauris pharetra et. Sem nulla pharetra diam sit amet nisl suscipit. Platea dictumst quisque sagittis purus 
                sit amet volutpat consequat. Cursus in hac habitasse platea dictumst. Morbi enim nunc faucibus a.
              </p>
            </div>  
            <div> </div>
        </div>

        <div class="grid-container spaceBetweenBodyItems">
            <div> </div>
            <div class="grid-item">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis 
                lectus nulla at. Arcu dictum varius duis at. Arcu non odio euismod lacinia at quis risus sed. Mollis nunc sed id semper risus in. Aliquam sem fringilla ut morbi 
                tincidunt augue interdum velit euismod. Lectus mauris ultrices eros in cursus. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Ultrices gravida dictum 
                fusce ut placerat orci nulla. Diam maecenas ultricies mi eget mauris pharetra et. Sem nulla pharetra diam sit amet nisl suscipit. Platea dictumst quisque sagittis purus 
                sit amet volutpat consequat. Cursus in hac habitasse platea dictumst. Morbi enim nunc faucibus a.
              </p>
            </div>
            <div class="grid-item"></div>
            <div class="grid-item centered">
              <img src={filler} alt="VisuSpeak Logo"width = "500"/>
            </div>  
            <div> </div>
        </div>

      </body>
      
      <Footer />
    </div>
  );
}
