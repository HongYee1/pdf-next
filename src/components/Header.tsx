import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='flex justify-between items-center p-[10px] h-[50px]'>
            <a href="/" className='p-[10px]'>Logo</a>
            <nav className='flex text-[15px] font-medium'>
                <a href="/pricing" className='hover:underline p-[10px]'>Pricing</a>
                <a href="/chrome-extension" className='hover:underline p-[10px]'>Chorme extension</a>
                <a href="/use-cases" className='hover:underline p-[10px]'>Use cases</a>
                <div className='p-[10px]'>EN</div>
                <a href="/sign-in" className='hover:underline p-[10px]'>Get started →</a>
            </nav>
        </header>
    );
};

export default Header;