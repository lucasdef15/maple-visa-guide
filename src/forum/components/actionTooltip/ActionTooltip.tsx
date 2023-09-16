import { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

interface ActionTooltipProps {
  title: string;
  children: ReactElement<any, any>;
  placement?: 'bottom' | 'top' | 'right' | 'left';
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#121212',
    boxShadow: theme.shadows[1],
    paddingInline: '10px',
    paddingBlock: '6px',
    borderRadius: '5px',
  },
}));

export default function ActionTooltip({
  title,
  children,
  placement,
}: ActionTooltipProps) {
  return (
    <LightTooltip title={title} placement={placement}>
      {children}
    </LightTooltip>
  );
}
