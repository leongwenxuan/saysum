import React, { createContext, useState, useContext } from 'react';

const TranscriptionContext = createContext();

export const useTranscription = () => {
  return useContext(TranscriptionContext);
};

export const TranscriptionProvider = ({ children }) => {
  const [transcription, setTranscription] = useState('');
  const [transcriptionUpdated, setTranscriptionUpdated] = useState(false);

  const updateTranscription = (newTranscription) => {
    setTranscription(newTranscription);
    setTranscriptionUpdated(true);
  };

  return (
    <TranscriptionContext.Provider value={{ transcription, transcriptionUpdated, setTranscription, updateTranscription, setTranscriptionUpdated }}>
      {children}
    </TranscriptionContext.Provider>
  );
};
