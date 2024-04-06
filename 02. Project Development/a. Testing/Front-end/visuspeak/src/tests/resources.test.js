/*
  In this file we conducted testing for Resources Page
  and it's features utlizing the @testing-library/react library
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Resources from '../modules/Resources.js'

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
       t: (key) => key, 
       i18n: {
         changeLanguage: () => new Promise(() => {}),
       },
    }),
   }));
   
   describe('Resources component', () => {
    it('renders the Resources component', () => {
       render(
         <Router>
           <Resources />
         </Router>
       );
   
       // Checking if the title is rendered
       expect(screen.getByText('Resources')).toBeInTheDocument();
   
       // Checking if the ASL Dictionary section is rendered
       expect(screen.getByText('ASLDictionary')).toBeInTheDocument();
       expect(screen.getByText('ASLDictionaryDescription')).toBeInTheDocument();
       expect(screen.getByText('ViewDictionary')).toBeInTheDocument();
   
       // Checking if the Learn ASL Professionally section is rendered
       expect(screen.getByText('LearnASLProfessionally')).toBeInTheDocument();
       expect(screen.getByText('LearnASLProfessionallyDescription')).toBeInTheDocument();
   
       
       const viewResourceButtons = screen.getAllByText('ViewResource');
       expect(viewResourceButtons.length).toBe(2);
       expect(viewResourceButtons[0]).toBeInTheDocument();
       expect(viewResourceButtons[1]).toBeInTheDocument();
   
       // Checking if the National Deaf News section is rendered
       expect(screen.getByText('NationalDeafNews')).toBeInTheDocument();
       expect(screen.getByText('NationalDeafNewsDescription')).toBeInTheDocument();
    });
   });