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



const MyContext = createContext();

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};



const MyContextProvider= ({ children }) => {
  const [imagesSplits, setImageSplits] =useState([[], [], [], [],[]]);
  const [json, setJson] =useState();
  const [isOpen,setIsOpen]=useState(false)

  useEffect(()=>{
    console.log(imagesSplits)
  },[imagesSplits])

  const contextValue = {
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
