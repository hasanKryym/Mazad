import { useState, createContext, useEffect } from "react";

export const BidsLoaderContext = createContext();

export const BidsLoaderStatus = (props) => {
  const [isLoading, setIsLoading] = useState({
    bidsLoaded: false,
    bidLoaded: false,
    productLoaded: false,
  });

  return (
    <BidsLoaderContext.Provider
      value={{
        loaderData: [isLoading, setIsLoading],
      }}
    >
      {props.children}
    </BidsLoaderContext.Provider>
  );
};
