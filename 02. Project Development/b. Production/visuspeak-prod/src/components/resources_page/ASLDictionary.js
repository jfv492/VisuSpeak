import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../../App.css';

import CardImageTop from '../../assets/images/Dictionary.png';
import { useTranslation } from "react-i18next";
const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '90%', // Ensure it doesn't exceed the width of the viewport
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
};


const options = [
  { label: 'A', videoUrl: 'https://www.youtube.com/embed/afw6i-u0TGs?&rel=0' },
  { label: 'B', videoUrl: 'https://www.youtube.com/embed/etpJqnHFASc?&rel=0' },
  { label: 'C', videoUrl: 'https://www.youtube.com/embed/kdRPp8a7GBk?&rel=0' },
  { label: 'D', videoUrl: 'https://www.youtube.com/embed/60H0CL16WLc?&rel=0' },
  { label: 'E', videoUrl: 'https://www.youtube.com/embed/6kAnab5bQhw?&rel=0' },
  { label: 'F', videoUrl: 'https://www.youtube.com/embed/VFeTkG-UXvs?&rel=0' },
  { label: 'G', videoUrl: 'https://www.youtube.com/embed/Cy4a8aWmiR4?&rel=0' },
  { label: 'H', videoUrl: 'https://www.youtube.com/embed/9IhsCgLsLk8?&rel=0' },
  { label: 'I', videoUrl: 'https://www.youtube.com/embed/STZ_YRgL4Qg?&rel=0' },
  { label: 'J', videoUrl: 'https://www.youtube.com/embed/vdASivTLRi8?&rel=0' },
  { label: 'K', videoUrl: 'https://www.youtube.com/embed/q_fHxBkv18E?&rel=0' },
  { label: 'L', videoUrl: 'https://www.youtube.com/embed/QzjjVmXoDg4?&rel=0' },
  { label: 'M', videoUrl: 'https://www.youtube.com/embed/nuzEYunMS0U?&rel=0' },
  { label: 'N', videoUrl: 'https://www.youtube.com/embed/yy1XPYWzrZA?&rel=0' },
  { label: 'O', videoUrl: 'https://www.youtube.com/embed/GDXULqCE8R8?&rel=0' },
  { label: 'P', videoUrl: 'https://www.youtube.com/embed/eMh9EyEDbsU?&rel=0' },
  { label: 'Q', videoUrl: 'https://www.youtube.com/embed/JgC5fH5f9X4?&rel=0' },
  { label: 'R', videoUrl: 'https://www.youtube.com/embed/Qqw4eQI0R84?&rel=0' },
  { label: 'S', videoUrl: 'https://www.youtube.com/embed/Hp_BNnHUdwg?&rel=0' },
  { label: 'T', videoUrl: 'https://www.youtube.com/embed/Hy43ofkc2Qo?&rel=0' },
  { label: 'U', videoUrl: 'https://www.youtube.com/embed/y6eKGZXxsQw?&rel=0' },
  { label: 'V', videoUrl: 'https://www.youtube.com/embed/k4ERoQEq0Ik?&rel=0' },
  { label: 'W', videoUrl: 'https://www.youtube.com/embed/5W8U2lAOyoU?&rel=0' },
  { label: 'X', videoUrl: 'https://www.youtube.com/embed/FceVCBjH368?&rel=0' },
  { label: 'Y', videoUrl: 'https://www.youtube.com/embed/-FXlYKzs7MY?&rel=0' },
  { label: 'Z', videoUrl: 'https://www.youtube.com/embed/_7B5CPptIXU?&rel=0' },
  { label: 'Hello', videoUrl: 'https://www.youtube.com/embed/Gp1z7YkLN0g?&rel=0' },
  { label: 'Yes', videoUrl: 'https://www.youtube.com/embed/rKZkAklM7Mg?&rel=0' },
  { label: 'Ask', videoUrl: 'https://www.youtube.com/embed/o_AGQVFavD4?&rel=0' },
  { label: 'Good', videoUrl: 'https://www.youtube.com/embed/IM6N8Ok6uPE?&rel=0' },
  { label: 'Good Bye', videoUrl: 'https://www.youtube.com/embed/JZA-7AksLW4?&rel=0' },
  { label: 'I', videoUrl: 'https://www.youtube.com/embed/pRYAPWLuBhQ?&rel=0' },
  { label: 'I Love You', videoUrl: 'https://www.youtube.com/embed/yY_-m1aE_Qw?&rel=0' },
  { label: 'More', videoUrl: 'https://www.youtube.com/embed/DpAsVj271Zw?&rel=0' },
  { label: 'No', videoUrl: 'https://www.youtube.com/embed/mUfSyvJZhxM?&rel=0' },
  { label: 'Please', videoUrl: 'https://www.youtube.com/embed/EMDsxkU1rwo?&rel=0' },
  { label: 'Sorry', videoUrl: 'https://www.youtube.com/embed/WSjodRVeQAU?&rel=0' },
  { label: 'Thank You', videoUrl: 'https://www.youtube.com/embed/r1N5qnb9qhk?&rel=0' },
  { label: 'They', videoUrl: 'https://www.youtube.com/embed/Nyv7KALx63g?&rel=0' },
  { label: 'We', videoUrl: 'https://www.youtube.com/embed/oPO2btY5Ex8?&rel=0' },
  { label: 'What', videoUrl: 'https://www.youtube.com/embed/M_BLUENPsyU?&rel=0' },
  { label: 'Where', videoUrl: 'https://www.youtube.com/embed/FRAZeHNFybA?&rel=0' },
  { label: 'Who', videoUrl: 'https://www.youtube.com/embed/KX4mlC91eN0?&rel=0' },
  { label: 'Why', videoUrl: 'https://www.youtube.com/embed/IqesrtF4P4I?&rel=0' },
  { label: 'You', videoUrl: 'https://www.youtube.com/embed/KLk7AgdnqDs?&rel=0' },
  { label: 'Your', videoUrl: 'https://www.youtube.com/embed/-73aTTYFk-s?&rel=0' }
];

const Grouped = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to find the video URL based on the selected option
  const findVideoUrl = (label) => {
    const option = options.find(option => option.label === label);
    return option ? option.videoUrl : '';
  };

  return (
    <div className="container my-5">
      <h1 className="">{t("ASLDictionary")}</h1>
      <p className="disclaimer-text p-3 rounded lead my-3">
      {t("ASLDictionaryDisclaimer")}
      </p>

      <Autocomplete
        id="grouped-demo"
        options={options.map((option) => option.label)}
        renderInput={(params) => (
          <TextField {...params} label={t("LearnASL")} variant="outlined" fullWidth />
        )}
        noOptionsText={t("NoASLWord")}
        onChange={(event, value) => setSelectedOption(value)}
        className="mt-3"
      />

      {selectedOption && (
        <Card className="mt-3">
          <CardContent>
            <IconButton
              aria-label="close"
              onClick={() => setSelectedOption(null)}
              className="position-absolute top-0 end-0"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" component="div">
            {t("LearnToSign")} {selectedOption}
            </Typography>
            <div className="video-responsive">
              <iframe
                src={findVideoUrl(selectedOption)}
                title="ASL Video"
                frameBorder="0"
                allowFullScreen
                style={{ width: '100%', height: '100%' }} // Adjust height to maintain the aspect ratio
              />
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
            {t("LearnToSignDescription")} '{selectedOption}' 
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Grouped;