// import { Inter } from 'next/font/google';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'About ',
    description: 'About',
};

export default function AboutLayout({ children }) {
    return <div>{children}</div>;
}
