import React, { useState } from "react";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

const SpeechTest = () => {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  const [speech, setSpeech] = useState("");
  const { speak } = useSpeechSynthesis();

  return (
    <>
      <div>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button onMouseDown={listen} onMouseUp={stop}>
          🎤
        </button>
        {listening && <div>Go ahead I'm listening</div>}
      </div>
      <div>
        <textarea
          value={speech}
          onChange={(event) => setSpeech(event.target.value)}
        />
        <button onClick={() => speak({ text: speech })}>Speak</button>
      </div>
    </>
  );
};

export default SpeechTest;
