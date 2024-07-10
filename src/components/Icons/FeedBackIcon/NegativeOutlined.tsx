import { FC } from 'react';

// Needs to be relative path for the type to be importable after build
import { SizeIconProps } from '../../../atoms/types';

const NegativeOutlined: FC<SizeIconProps> = ({ size }) => (
  <svg
    width={size ? size : 48}
    height={size ? size : 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="negative-outlined"
  >
    <path
      d="M12 35.0466C12 33.4708 12.3104 31.9103 12.9134 30.4544C13.5165 28.9985 14.4004 27.6757 15.5147 26.5613C16.629 25.447 17.9519 24.5631 19.4078 23.9601C20.8637 23.357 22.4241 23.0466 24 23.0466C25.5759 23.0466 27.1363 23.357 28.5922 23.9601C30.0481 24.5631 31.371 25.447 32.4853 26.5614C33.5996 27.6757 34.4835 28.9985 35.0866 30.4544C35.6896 31.9103 36 33.4708 36 35.0466L32.4 35.0466C32.4 33.9435 32.1827 32.8512 31.7606 31.8321C31.3384 30.813 30.7197 29.8869 29.9397 29.1069C29.1597 28.3269 28.2337 27.7082 27.2145 27.286C26.1954 26.8639 25.1031 26.6466 24 26.6466C22.8969 26.6466 21.8046 26.8639 20.7855 27.286C19.7663 27.7082 18.8403 28.3269 18.0603 29.1069C17.2803 29.8869 16.6616 30.813 16.2394 31.8321C15.8173 32.8512 15.6 33.9435 15.6 35.0466L12 35.0466Z"
      fill="#6F6F6F"
    />
    <circle cx="16" cy="15" r="3" fill="#6F6F6F" />
    <circle cx="32" cy="15" r="3" fill="#6F6F6F" />
    <rect
      x="0.5"
      y="0.5"
      width="47"
      height="47"
      rx="7.5"
      stroke="#6F6F6F"
      strokeDasharray="4 4"
    />
  </svg>
);

export default NegativeOutlined;
