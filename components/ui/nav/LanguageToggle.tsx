import React from 'react'
import { useLanguage } from '../providers/language-provider';
import Image from "next/image";


interface OptionProps {
    choice: string;
}

const Option: React.FC<OptionProps> = ({ choice }) => {
    return (
        <div className='flex items-center gap-2 max-h-6 min-h-6 min-w-'>
            <Image width={32} height={14} src={choice == "en" ? "/english-flag.jpg": "/welsh-flag.jpg"} className='text-[12px]' alt={`{choice} flag`}/>
            <div className='text-[10px]'>{choice == "en" ? "switch to welsh" : "newid i Saesneg"}</div>
        </div>
    );
};

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
      <button onClick={toggleLanguage} className="p-2 border rounded min-w-42">
        <Option  choice={language.toString()}/>
      </button>
    );
  }

export default LanguageToggle