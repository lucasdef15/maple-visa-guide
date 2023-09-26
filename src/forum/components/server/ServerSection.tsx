import { IconButton, Stack, Typography } from '@mui/material';
import {
  ChannelType,
  MemberRole,
  ServerWithMembersWithProfile,
} from '../../../../types';
import ActionTooltip from '../actionTooltip/ActionTooltip';
import { CgMathPlus } from 'react-icons/cg';
import { useModal } from '../../hooks/use-modal-store';
import { AiOutlineSetting } from 'react-icons/ai';

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfile;
}

export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal();
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Typography
        sx={{ textTransform: 'uppercase' }}
        fontSize={'.9rem'}
        fontWeight={'bold'}
        color={(theme) => theme.palette.text.secondary}
      >
        {label}
      </Typography>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip title={'Create Channel'} placement={'top'}>
          <IconButton onClick={() => onOpen('createChannel')}>
            <CgMathPlus />
          </IconButton>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip title={'Settings'} placement={'top'}>
          <IconButton onClick={() => onOpen('members', { server })}>
            <AiOutlineSetting />
          </IconButton>
        </ActionTooltip>
      )}
    </Stack>
  );
}
