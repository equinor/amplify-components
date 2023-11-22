import { forwardRef, ReactNode, useMemo } from 'react';

import OptionalTooltip from '../../../../../../DataDisplay/OptionalTooltip';

import styled from 'styled-components';

const DisabledTooltip = styled(OptionalTooltip)`
  white-space: break-spaces;
  text-align: center;
  width: 480px;
`;

export interface LockedInputTooltipProps {
  show: boolean;
  children: ReactNode;
}

const LockedInputTooltip = forwardRef<HTMLDivElement, LockedInputTooltipProps>(
  ({ show, children }, ref) => {
    const tooltipTitle = useMemo(() => {
      if (show) {
        return 'The report was successfully submitted to ServiceNow.  \n This field is locked so you can retry sending it to the development team. \n To reset the form, use the button in the bottom left corner.';
      }
      return '';
    }, [show]);

    return (
      <DisabledTooltip title={tooltipTitle}>
        <div ref={ref}>{children}</div>
      </DisabledTooltip>
    );
  }
);

LockedInputTooltip.displayName = 'LockedInputTooltip';
export default LockedInputTooltip;