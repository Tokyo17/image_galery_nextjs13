"use client"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';


const client = new ApolloClient({
  uri: 'https://optimum-corgi-31.hasura.app/v1/graphql',
  headers:{
    "x-hasura-admin-secret":
    "dKHsPm53cqnlHZuM3TpUiqgGsVxicG36KEDxAhw2cUeKfOB5R4TS2ab8vRkUaLy9"
  },
  cache: new InMemoryCache(),
});

// Definisikan tipe data untuk context
export type MyContextType = {
  imagesSplits: any[][];
  setImageSplits: (message: any) => void;
  json: any;
  setJson: (message: any) => void;
  isOpen:boolean,
  setIsOpen:(message:boolean)=>void
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
  const [isOpen,setIsOpen]=useState(false)

  useEffect(()=>{
    console.log(imagesSplits)
  },[imagesSplits])

  const contextValue: MyContextType = {
    imagesSplits,
    setImageSplits,
    json,
    setJson,
    isOpen,
    setIsOpen
  };


  return <MyContext.Provider value={contextValue}>
    <ApolloProvider client={client}>
    {children}
    </ApolloProvider>
    
    </MyContext.Provider>;
};

export default MyContextProvider;
