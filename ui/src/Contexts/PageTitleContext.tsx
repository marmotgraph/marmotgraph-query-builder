// import { createContext, useContext, useState } from 'react';
//
// const PageTitleContext = createContext();
//
// export const PageTitleProvider = ({ children }) => {
//     const [title, setTitle] = useState('');
//
//     return (
//         <PageTitleContext.Provider value={{ title, setTitle }}>
//             {children}
//         </PageTitleContext.Provider>
//     );
// };
//
// export const usePageTitle = () => useContext(PageTitleContext);

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context
interface PageTitleContextType {
    title: string;
    setTitle: (title: string) => void;
}

// Create context with a default value matching the interface
const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

// Type the props for the provider
interface PageTitleProviderProps {
    children: ReactNode;
}

export const PageTitleProvider = ({ children }: PageTitleProviderProps) => {
    const [title, setTitle] = useState<string>('');

    return (
        <PageTitleContext.Provider value={{ title, setTitle }}>
            {children}
        </PageTitleContext.Provider>
    );
};

export const usePageTitle = (): PageTitleContextType => {
    const context = useContext(PageTitleContext);
    if (context === undefined) {
        throw new Error('usePageTitle must be used within a PageTitleProvider');
    }
    return context;
};