// import { Inter } from 'next/font/google';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'About ',
    description: 'About',
};
export default function HelpLayout({ children }) {
    return (
        <div>
            {children}
            <h2>*** sub layout ***</h2>
        </div>
    );
}
