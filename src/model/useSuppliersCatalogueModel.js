import { useContext, createContext, useState, useEffect } from "react";
import SuppliersCatalogueModel from "./model";

const ModelContext = createContext();

export const useSuppliersCatalogueModel = () => {
    return useContext(ModelContext);
};

export const SuppliersCatalogueModelProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [model, setModel] = useState(() => new SuppliersCatalogueModel());
    const [error, setError] = useState(null);

    useEffect(() => {
        let isUnmounted = false;

        const modelNewState = new SuppliersCatalogueModel();

        modelNewState.init()
            .then((res) => {
                if (!isUnmounted) {
                    setModel(modelNewState);                
                    setIsLoading(false);        
                }                        
            })
            .catch(err => {
                if (!isUnmounted) {
                    setIsLoading(false);
                    setError(error);
                }              
            });
        
        return () => {
            isUnmounted = true;
        }
    }, [])

    return (
        <ModelContext.Provider value={{model, isLoading, error}}>
            {children}
        </ModelContext.Provider>
    );
};