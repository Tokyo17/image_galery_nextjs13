"use client"
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

// Definisikan tipe data untuk context
export type MyContextType = {
  imagesSplits: any[][];
  setImageSplits: (message: any) => void;
  json: any;
  setJson: (message: any) => void;
};

// Buat instance context dengan tipe data yang telah ditentukan
const MyContext = createContext<MyContextType | undefined>(undefined);

// Buat custom hook untuk mengakses context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

type MyContextProviderProps = {
  children: React.ReactNode;
};

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [imagesSplits, setImageSplits] =useState<any[][]>([[], [], [], [],[]]);
  const [json, setJson] =useState<any>();


  const contextValue: MyContextType = {
    imagesSplits,
    setImageSplits,
    json,
    setJson
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
