import { createContext, Context } from 'react';

interface MyContextType {
    name: string;
    mode: string;
    toggleMode: () => void;
}

const myContext: Context<MyContextType | undefined> = createContext<MyContextType | undefined>(undefined);

export default myContext;
