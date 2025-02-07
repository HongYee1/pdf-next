import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='flex justify-between items-center p-[10px] h-[50px]'>
            <a href="/">Logo</a>
            <nav className='flex gap-4'>
                <a href="/about" className='hover:underline'>Pricing</a>
                <a href="/about" className='hover:underline'>Chorme extension</a>
                <a href="/about" className='hover:underline'>Use cases</a>
                <div>EN</div>
                <a href="/about" className='hover:underline'>Get started →</a>
            </nav>
        </header>
    );
};

export default Header;