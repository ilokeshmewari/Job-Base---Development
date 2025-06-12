import React from 'react';
import {
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
} from 'react-icons/fa';

const items = [
  {
    label: 'Subscribe',
    icon: <FaYoutube size={20} />,
    link: 'https://youtube.com/@jobbase25',
    hoverBg: 'hover:bg-red-600',
  },
  {
    label: 'Follow',
    icon: <FaInstagram size={20} />,
    link: 'https://instagram.com/jobbase02',
    hoverBg: 'hover:bg-pink-500',
  },
  {
    label: 'Join',
    icon: <FaTelegramPlane size={20} />,
    link: 'https://t.me/jobbase_25',
    hoverBg: 'hover:bg-blue-500',
  },
  {
    label: 'Chat',
    icon: <FaWhatsapp size={20} />,
    link: 'https://chat.whatsapp.com/HpM7OdWPlTs0A8Sm913WKF',
    hoverBg: 'hover:bg-green-500',
  },
  {
    label: 'Like',
    icon: <FaFacebookF size={20} />,
    link: 'https://www.facebook.com/people/Job-Base-Community/61576404751988/',
    hoverBg: 'hover:bg-blue-700',
  },
];

const SocialWidget = () => {
  return (
    <div className="hidden md:flex fixed top-1/3 right-0 z-50 flex-col items-end">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex items-center bg-white text-black border border-gray-200 pr-3 pl-2 py-2 transition-all duration-300 w-[50px] hover:w-[160px]
            ${item.hoverBg} hover:text-white
            ${index === 0 ? 'rounded-tl-xl' : ''}
            ${index === items.length - 1 ? 'rounded-bl-xl' : ''}
          `}
        >
          <span className="absolute left-10 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
            {item.label}
          </span>
          <span className="z-10">{item.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialWidget;
