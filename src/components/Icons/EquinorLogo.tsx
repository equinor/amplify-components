import React, { forwardRef } from 'react';

import { tokens } from '@equinor/eds-tokens';

// Needs to be relative path for the type to be importable after build
import { SizeIconProps } from '../../types';

const { colors } = tokens;

const colorSwitch = (color?: 'red' | 'white' | 'black') => {
  switch (color) {
    case 'red':
      return colors.logo.fill_positive.rgba;
    case 'white':
      return colors.logo.fill_negative.rgba;
    case 'black':
      return '#000';
    default:
      return colors.logo.fill_positive.rgba;
  }
};

export interface EquinorLogoProps extends SizeIconProps {
  large?: boolean;
  color?: 'red' | 'white' | 'black';
}

const EquinorLogo = forwardRef<SVGSVGElement, EquinorLogoProps>(
  ({ large, color, size }, ref) => (
    <React.Fragment>
      {large ? (
        <svg
          width={size ? size * 2 : 24 * 2} // Size should be related to the Equinor Logo itself and not the text-size,
          height={size ? size * 2 : 24 * 2} // That's why we multiply be 2 here on the large version
          viewBox="0 0 75 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          data-testid="logo"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M55.485 5.72054L55.4852 12.3731C55.485 12.5703 55.5839 12.7525 55.7547 12.8508L61.5192 16.1718C61.7637 16.3127 62.0756 16.1362 62.0758 15.8539V9.20147C62.076 9.00427 61.9708 8.8221 61.7999 8.72359L56.0356 5.40281C55.7909 5.26192 55.4854 5.4384 55.485 5.72054ZM73.2401 0.525845L64.9411 5.30705C64.6952 5.44867 64.5437 5.71082 64.5441 5.99462V15.5723C64.5444 15.9788 64.9933 16.2327 65.3454 16.0298L73.6446 11.2489C73.8904 11.1071 74.0326 10.845 74.0322 10.5612L74.0324 0.983548C74.032 0.577027 73.5923 0.323134 73.2401 0.525845ZM61.8556 20.8961L59.5493 22.225C59.4811 22.2644 59.4389 22.3373 59.4389 22.4162L59.4387 25.0776C59.4387 25.1908 59.5638 25.2613 59.6616 25.2049L61.9679 23.8762C62.0363 23.837 62.076 23.764 62.0758 23.6853V21.0234C62.0758 20.9106 61.9534 20.84 61.8556 20.8961ZM60.5115 18.4403L57.0576 16.4416C56.9552 16.3825 56.829 16.3825 56.7266 16.4416L53.2727 18.4403C53.1261 18.525 53.1261 18.7366 53.2727 18.8215L56.7266 20.8198C56.829 20.8792 56.9552 20.8792 57.0576 20.8198L60.5115 18.8215C60.6581 18.7366 60.6581 18.525 60.5115 18.4403ZM66.072 18.8006L67.6068 19.6885C67.6976 19.7411 67.8096 19.7411 67.9006 19.6885L69.4352 18.8006C69.5654 18.725 69.5654 18.537 69.4352 18.4616L67.9006 17.5737C67.8096 17.521 67.6976 17.521 67.6068 17.5737L66.072 18.4616C65.9418 18.537 65.9418 18.725 66.072 18.8006ZM64.8376 20.9376L66.3738 21.8225C66.4648 21.875 66.5209 21.9722 66.5209 22.0773L66.5191 23.8502C66.5189 24.0006 66.356 24.0947 66.2256 24.0197L64.6894 23.1347C64.5984 23.0823 64.5443 22.9847 64.5443 22.8799L64.5441 21.1071C64.5441 20.9568 64.7072 20.8624 64.8376 20.9376ZM49.212 19.1858C49.151 19.0332 49.0212 18.9776 48.8763 19.0638C48.7314 19.15 46.0076 20.773 46.0076 20.773V19.2774C46.0076 19.1095 45.9006 19.0484 45.7482 19.1095L44.863 19.43C44.741 19.4757 44.6952 19.5672 44.6952 19.6894V26.2647C44.6952 26.4021 44.7867 26.4935 44.9241 26.4935H45.7786C45.9158 26.4935 46.0076 26.4021 46.0076 26.2647V22.2373C46.0076 22.2373 49.2192 20.255 49.3494 20.1772C49.4795 20.0992 49.5461 20.0332 49.4867 19.8871C49.4217 19.727 49.212 19.1858 49.212 19.1858ZM1.90371 21.9614C2.19356 20.9086 3.01779 20.2676 4.17755 20.2676C5.44407 20.2676 6.11531 21.0153 6.1764 21.9614H1.90371ZM7.56528 22.3582C7.56528 20.527 6.3138 18.9857 4.22323 18.9857C2.1631 18.9857 0.454102 20.4661 0.454102 22.877C0.454102 25.0745 1.88848 26.6766 4.29954 26.6766C5.39821 26.6766 6.49707 26.2952 7.32111 25.5627C7.42788 25.4711 7.42788 25.3491 7.35157 25.2422L6.93954 24.6014C6.86323 24.4794 6.74123 24.4642 6.61924 24.5557C5.87132 25.105 5.10836 25.3796 4.29954 25.3796C2.75839 25.3796 1.91893 24.3724 1.81217 23.1059H7.33946C7.4809 23.1059 7.56528 23.0036 7.56528 22.8801V22.3582ZM12.379 25.3796C11.082 25.3796 9.9679 24.4946 9.9679 22.8159C9.9679 21.1373 11.082 20.2676 12.379 20.2676C13.737 20.2676 14.79 21.1373 14.79 22.8159C14.79 24.5099 13.737 25.3796 12.379 25.3796ZM15.0037 29.5455H15.8582C15.9955 29.5455 16.087 29.454 16.087 29.3166V19.2757C16.087 19.1079 15.9802 19.0468 15.8124 19.1079L14.9426 19.4285C14.8207 19.4742 14.7746 19.5657 14.7746 19.6879V20.0082C14.3017 19.3674 13.3707 18.9857 12.3637 18.9857C10.3645 18.9857 8.62506 20.4813 8.62506 22.8311C8.62506 24.9066 9.9679 26.6766 12.2874 26.6766C13.3402 26.6766 14.3474 26.2036 14.7746 25.6696V29.3166C14.7746 29.454 14.8663 29.5455 15.0037 29.5455ZM20.434 26.6766C21.2274 26.6766 22.0975 26.4172 22.662 25.5933V26.2647C22.662 26.4019 22.7535 26.4935 22.8909 26.4935H23.7454C23.8828 26.4935 23.9742 26.4019 23.9742 26.2647V19.2909C23.9742 19.1079 23.8674 19.0468 23.7148 19.1079L22.8298 19.4285C22.7078 19.4742 22.662 19.5657 22.662 19.6879V23.3501C22.662 24.6473 21.8227 25.3796 20.6782 25.3796C19.549 25.3796 18.7861 24.6625 18.7861 23.3501V19.2757C18.7861 19.1079 18.6791 19.0468 18.5267 19.1079L17.6417 19.4285C17.5194 19.4742 17.4735 19.5657 17.4735 19.6879V23.3958C17.4735 25.5627 18.7861 26.6766 20.434 26.6766ZM25.7595 18.3297L26.6905 18.0244C26.8429 17.9785 26.904 17.9022 26.904 17.7498V16.6359C26.904 16.4985 26.7972 16.3917 26.6294 16.4528L25.7136 16.7885C25.5764 16.8342 25.5001 16.8953 25.5001 17.0477V18.1159C25.5001 18.2838 25.5916 18.3906 25.7595 18.3297ZM25.7747 26.4935H26.6294C26.7666 26.4935 26.8583 26.4019 26.8583 26.2647V19.2757C26.8583 19.1079 26.7514 19.0468 26.5989 19.1079L25.7136 19.4285C25.5916 19.4742 25.5458 19.5657 25.5458 19.6879V26.2647C25.5458 26.4019 25.6373 26.4935 25.7747 26.4935ZM28.6585 26.4935H29.513C29.6504 26.4935 29.742 26.4019 29.742 26.2647V22.3123C29.742 21.0153 30.5814 20.2828 31.7258 20.2828C32.8549 20.2828 33.6178 21.0001 33.6178 22.3123V26.2647C33.6178 26.4019 33.7094 26.4935 33.8468 26.4935H34.7015C34.8387 26.4935 34.9304 26.4019 34.9304 26.2647V22.2666C34.9304 20.0998 33.6178 18.9857 31.9699 18.9857C31.1765 18.9857 30.3068 19.2451 29.742 20.0693V19.2757C29.742 19.1079 29.6352 19.0468 29.4826 19.1079L28.5974 19.4285C28.4754 19.4742 28.4298 19.5657 28.4298 19.6879V26.2647C28.4298 26.4019 28.5211 26.4935 28.6585 26.4935ZM39.8204 25.3948C38.3097 25.3948 37.3941 24.2657 37.3941 22.8311C37.3941 21.3967 38.3097 20.2676 39.8204 20.2676C41.3157 20.2676 42.2313 21.3967 42.2313 22.8311C42.2313 24.2657 41.3157 25.3948 39.8204 25.3948ZM39.8204 18.9857C37.6229 18.9857 36.0513 20.6185 36.0513 22.8311C36.0513 25.0439 37.6229 26.6766 39.8204 26.6766C42.0177 26.6766 43.5743 25.0439 43.5743 22.8311C43.5743 20.6185 42.0177 18.9857 39.8204 18.9857Z"
            fill={colorSwitch(color)}
            data-testid="path"
          />
        </svg>
      ) : (
        <svg
          width={size ? size : 24}
          height={size ? size : 24}
          viewBox="0 0 42 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          data-testid="logo"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.33323 10.2045L5.33358 23.0959C5.33323 23.478 5.52484 23.831 5.85579 24.0216L17.0263 30.457C17.5002 30.73 18.1045 30.388 18.1049 29.8409V16.9499C18.1052 16.5677 17.9015 16.2147 17.5702 16.0238L6.40005 9.58875C5.92583 9.31573 5.33394 9.65771 5.33323 10.2045ZM39.7392 0.138079L23.6573 9.40318C23.1809 9.67762 22.8873 10.1856 22.888 10.7356V29.2953C22.8887 30.083 23.7586 30.575 24.4407 30.1819L40.5231 20.9175C40.9994 20.6427 41.2749 20.1347 41.2742 19.5847L41.2746 1.02502C41.2738 0.23726 40.4217 -0.254736 39.7392 0.138079ZM17.6783 39.6119L13.2091 42.1871C13.0768 42.2635 12.9951 42.4046 12.9951 42.5575L12.9947 47.7149C12.9947 47.9342 13.2372 48.0708 13.4266 47.9616L17.8958 45.3868C18.0284 45.3107 18.1052 45.1693 18.1049 45.0168V39.8586C18.1049 39.64 17.8678 39.5031 17.6783 39.6119ZM15.0736 34.853L8.38048 30.9799C8.18212 30.8655 7.93754 30.8655 7.73918 30.9799L1.04603 34.853C0.761999 35.0172 0.761999 35.4271 1.04603 35.5917L7.73918 39.464C7.93754 39.5792 8.18212 39.5792 8.38048 39.464L15.0736 35.5917C15.3577 35.4271 15.3577 35.0172 15.0736 34.853ZM25.8488 35.5512L28.8229 37.2717C28.9988 37.3737 29.216 37.3737 29.3923 37.2717L32.366 35.5512C32.6184 35.4047 32.6184 35.0403 32.366 34.8942L29.3923 33.1736C29.216 33.0716 28.9988 33.0716 28.8229 33.1736L25.8488 34.8942C25.5964 35.0403 25.5964 35.4047 25.8488 35.5512ZM23.4568 39.6922L26.4336 41.4071C26.6099 41.5088 26.7187 41.6972 26.7187 41.9009L26.7152 45.3363C26.7148 45.6278 26.3991 45.8102 26.1464 45.6648L23.1695 43.9499C22.9932 43.8483 22.8883 43.6591 22.8883 43.4562L22.888 40.0207C22.888 39.7296 23.204 39.5465 23.4568 39.6922Z"
            fill={colorSwitch(color)}
            data-testid="path"
          />
        </svg>
      )}
    </React.Fragment>
  )
);

EquinorLogo.displayName = 'EquinorLogo';

export default EquinorLogo;
