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

  const roleStr: string = role as unknown as string;
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ padding: 0, height: 35 }}
    >
      <Typography
        sx={{ textTransform: 'uppercase' }}
        fontSize={'.85rem'}
        fontWeight={600}
        color={(theme) => theme.palette.text.secondary}
      >
        {label}
      </Typography>
      {roleStr !== 'GUEST' && sectionType === 'channels' && (
        <ActionTooltip title={'Create Channel'} placement={'top'}>
          <IconButton
            onClick={() => onOpen('createChannel', { channelType })}
            sx={{ fontSize: '1.4rem' }}
          >
            <CgMathPlus />
          </IconButton>
        </ActionTooltip>
      )}
      {roleStr === 'ADMIN' && sectionType === 'members' && (
        <ActionTooltip title={'Manage Members'} placement={'top'}>
          <IconButton
            onClick={() => onOpen('members', { server })}
            sx={{ fontSize: '1.4rem' }}
          >
            <AiOutlineSetting />
          </IconButton>
        </ActionTooltip>
      )}
    </Stack>
  );
}
