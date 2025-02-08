import React from "react";
import Image from "next/image";
import logo from "../../public/favicon.ico";
import tiktok from "../../public/tiktok-svgrepo-com.svg";
import twitter from "../../public/twitter-154-svgrepo-com.svg";
import ins from "../../public/instagram-svgrepo-com.svg";
import youtube from "../../public/youtube-svgrepo-com.svg";

type linksGroup = {
    title: string;
    links: { name: string; url: string }[];
};

const productsLinks: linksGroup = {
    title: "Products",
    links: [
        { name: "Use cases", url: "" },
        { name: "Chorme extension", url: "" },
        { name: "API docs", url: "" },
        { name: "Pricing", url: "" },
        { name: "Video tutorials", url: "" },
        { name: "Resouces", url: "" },
        { name: "Blog", url: "" },
        { name: "FAQ", url: "" },
    ],
};
const links: linksGroup = {
    title: "We also built",
    links: [
        { name: "Resume AI Scanner", url: "" },
        { name: "Invoice AI Scanner", url: "" },
        { name: "AI Quiz Generator", url: "" },
        { name: "QuickyAI", url: "" },
        { name: "Doctrine", url: "" },
        { name: "PDF GPTs", url: "" },
        { name: "PDF AI generator", url: "" },
        { name: "Other PDF tools", url: "" },
    ],
};
const companyLinks: linksGroup = {
    title: "Company",
    links: [
        { name: "PDF.ai vs ChatPDF", url: "" },
        { name: "PDF.ai vs Acrobat Reader", url: "" },
        { name: "Legal", url: "" },
        { name: "Affiliate program", url: "" },
        { name: "Investor", url: "" },
    ],
};

const Footer: React.FC = () => {
    const renderLinks = (links: linksGroup) => {
        return (
            <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    {links.title}
                </h3>
                <ul className="mt-6 space-y-4 list-none p-0">
                    {links.links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.url}
                                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <footer className="w-full flex justify-center items-center py-4">
            <div className="max-w-7xl flex justify-between items-centerpx-6 pb-8 pt-16 sm:mt-12 lg:mt-16 lg:px-8 border-t border-gray-900/10">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Image width={24} height={24} src={logo} alt="logo" />
                        <p>
                            Chat with any PDF: ask questions, get summaries,
                            find information, and more.
                        </p>
                        <div className="flex space-x-4">
                            <Image width={24} height={24} src={tiktok} alt="tiktok" />
                            <Image width={24} height={24} src={ins} alt="ins" />
                            <Image width={24} height={24} src={twitter} alt="twitter" />
                            <Image width={24} height={24} src={youtube} alt="youtube" />
                        </div>
                    </div>
                    <div className="mt-16 md:grid md:grid-cols-3 md:gap-8 xl:col-span-2 xl:mt-0">
                        {renderLinks(productsLinks)}
                        {renderLinks(links)}
                        {renderLinks(companyLinks)}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
