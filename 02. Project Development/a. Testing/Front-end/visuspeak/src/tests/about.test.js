/*
  In this file we conducted testing on the About Us page 
  and it's features utlizing the @testing-library/react library
 */

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import AboutFeatures from '../components/about/AboutFeatures';
import AboutSections from '../components/about/AboutSections';
import AboutSocial from '../components/about/AboutSocial';

/*****************  Component Testing ********************/

describe('AboutFeatures component', () => {
//Test suite to ensure all features are visible  
  test('render all feature', () => {
    //Rendering the components
    const { getByText } = render(<AboutFeatures />);
    expect(getByText('Feature1')).toBeInTheDocument();
    expect(getByText('Feature2')).toBeInTheDocument();
    expect(getByText('Feature3')).toBeInTheDocument();
    expect(getByText('Feature4')).toBeInTheDocument();
    expect(getByText('Feature5')).toBeInTheDocument();
  });
});

describe('AboutSections component', () => {
    // Test suite to ensure all videos are visible 
  test('render all video sections', () => {
    const { getAllByTitle } = render(<AboutSections />);
    const videoPlayers = getAllByTitle(/YouTube video player/);
    expect(videoPlayers.length).toBe(3);
  });

  // Test suite to ensure project idea description is visible
  test('render project idea description', () => {
    const { getByText } = render(<AboutSections />);
    expect(getByText('Project Idea')).toBeInTheDocument();
    expect(getByText('Project Idea Description')).toBeInTheDocument();
  });

  // Test suite to ensure project background description is visible
  test('render project background description', () => {
    const { getByText } = render(<AboutSections />);
    expect(getByText('Project Background')).toBeInTheDocument();
    expect(getByText('Project Background Description')).toBeInTheDocument();
  });

  // Test suite to ensure about VisuSpeak description is visible
  test('render about VisuSpeak description', () => {
    const { getByText } = render(<AboutSections />);
    expect(getByText('About VisuSpeak')).toBeInTheDocument();
    expect(getByText('About VisuSpeak Description')).toBeInTheDocument();
  });
  
});

/*****************  Regression Testing ********************/
describe('AboutSocial component', () => {
  // Test suite to ensure Learn more section is visible 
  test('render Learn More section', () => {
    const { getByText } = render(<AboutSocial />);
    expect(getByText('Learn More')).toBeInTheDocument();
  });
  // Test suite to ensure Learn more description is visible 
  test('render Learn More description', () => {
    const { getByText } = render(<AboutSocial />);
    expect(getByText('Learn More Description')).toBeInTheDocument();
  });
  // Test suite to ensure GitHub link is working 
  test('render GitHub link', () => {
    const { getByText } = render(<AboutSocial />);
    expect(getByText('GitHub')).toBeInTheDocument();
  });
  // Test suite to ensure Youtube link is working 
  test('render YouTube link', () => {
    const { getByText } = render(<AboutSocial />);
    expect(getByText('YouTube')).toBeInTheDocument();
  });
});
