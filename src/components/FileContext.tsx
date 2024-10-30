"use client";

import React, { createContext, useContext, useState} from 'react';

interface FileProviderProps {
    children: React.ReactNode;
}

interface FileContextType {
    fileName: string | null;
    setFileName: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    
    return(
        <FileContext.Provider value={{fileName, setFileName}}>
            {children}
        </FileContext.Provider>
    )
};

export const useFile = () => {
    const context = useContext(FileContext);
    if(!context) {
        throw new Error('useFile deve ser usado dentro de um FileProvider');
    }

    return context;
}