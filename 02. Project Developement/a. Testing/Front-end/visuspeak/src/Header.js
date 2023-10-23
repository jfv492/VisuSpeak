import './VisuSpeak.css';
import logo from './images/VisuSpeak_Logo.jpeg';

export default function Header() {
    return (
      <div className = "header">
        <div class="heading-grid-container">
          <div class="grid-item">
            <img src={logo} alt="VisuSpeak Logo" height = "70"/>
          </div>
          <div class="grid-item"></div>
          <div class="grid-item">Home</div>  
          <div class="grid-item">ASL Resources</div>
        </div>
      </div>
    );
  }