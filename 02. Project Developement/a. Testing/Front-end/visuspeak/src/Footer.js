import './VisuSpeak.css';
import whiteLogo from './images/VisuSpeakLogoWhite.png';

export default function Footer() {
    return (
      <div className = "footer">
        <div class="grid-container">
          <div class="grid-item">
            <img src={whiteLogo} alt="VisuSpeak Logo" height="70"/>
          </div>
          <div class="grid-item"></div>
          <div class="grid-item">Home</div>  
          <div class="grid-item">ASL Resources</div>
        </div>
      </div>
    );
  }