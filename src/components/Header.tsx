"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languageShort = [
    "EN",
    "ES",
    "PT",
    "AR",
    "ZH-CN",
    "JA",
    "DE",
    "FR",
    "KO",
    "IT",
];
const languageLong = [
    "English",
    "Spanish",
    "Portuguese",
    "Arabic",
    "Chinese",
    "Japanese",
    "German",
    "French",
    "Korean",
    "Italian",
];
const languageImg = [
    "https://hatscripts.github.io/circle-flags/flags/us.svg",
    "https://hatscripts.github.io/circle-flags/flags/es.svg",
    "https://hatscripts.github.io/circle-flags/flags/pt.svg",
    "https://hatscripts.github.io/circle-flags/flags/sa.svg",
    "https://hatscripts.github.io/circle-flags/flags/cn.svg",
    "https://hatscripts.github.io/circle-flags/flags/jp.svg",
    "https://hatscripts.github.io/circle-flags/flags/de.svg",
    "https://hatscripts.github.io/circle-flags/flags/fr.svg",
    "https://hatscripts.github.io/circle-flags/flags/kr.svg",
    "https://hatscripts.github.io/circle-flags/flags/it.svg",
];

const Header: React.FC = () => {
    const [langIndex, setLangIndex] = useState<number>(0);

    return (
        <header className="flex justify-between items-center p-[10px] h-[70px]">
            <a href="/" className="p-[10px]">
                Logo
            </a>
            <nav className="flex text-[15px] font-medium">
                <a href="/pricing" className="hover:underline p-[10px]">
                    Pricing
                </a>
                <a
                    href="/chrome-extension"
                    className="hover:underline p-[10px]"
                >
                    Chorme extension
                </a>
                <a href="/use-cases" className="hover:underline p-[10px]">
                    Use cases
                </a>
                <div className="p-[10px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap-2">
                            <Image
                                src={languageImg[langIndex]}
                                alt={languageShort[langIndex]}
                                width={24}
                                height={24}
                            />
                            <span>{languageShort[langIndex]}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {languageLong.map((lang, index) => (
                                <DropdownMenuItem
                                    key={lang}
                                    onClick={() => setLangIndex(index)}
                                    className="gap-4"
                                >
                                    <Image
                                        src={languageImg[index]}
                                        alt={lang}
                                        width={24}
                                        height={24}
                                    />
                                    <span className="text-gray-900 text-base">
                                        {lang}
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <a href="/sign-in" className="hover:underline p-[10px]">
                    Get started →
                </a>
            </nav>
        </header>
    );
};

export default Header;
