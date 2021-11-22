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

        const _m = new SuppliersCatalogueModel();

        _m.init()
            .then((res) => {
                if (isUnmounted) {
                    return;
                }
                setModel(_m);
                // console.log('result are', res);
                setIsLoading(false);
                console.log('Model loaded!');
            })
            .catch(err => {
                if (isUnmounted) {
                    return;
                }
                setIsLoading(false);
                setError(error);
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