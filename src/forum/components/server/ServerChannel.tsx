import { BiEdit, BiHash, BiLockAlt, BiTrash } from 'react-icons/bi';
import {
  Channel,
  ChannelType,
  MemberRole,
  ServerWithMembersWithProfile as Server,
} from '../../../../types';
import { AiOutlineAudio } from 'react-icons/ai';
import { LuVideo } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import ActionTooltip from '../actionTooltip/ActionTooltip';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { ModalType, useModal } from '../../hooks/use-modal-store';
import { ForumContext } from '../../../contexts/ForumContext';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: BiHash,
  [ChannelType.AUDIO]: AiOutlineAudio,
  [ChannelType.VIDEO]: LuVideo,
};

export default function ServerChannel({
  channel,
  server,
  role,
}: ServerChannelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsChannelLoading } = useContext(ForumContext);

  const { onOpen } = useModal();
  const params = useParams();
  const navigate = useNavigate();

  const Icon: React.ComponentType =
    iconMap[ChannelType[channel.type] as unknown as ChannelType];

  if (!Icon) {
    return null;
  }

  const onClick = () => {
     setIsChannelLoading(true);
    navigate(`/membros/forum/servers/${params.id}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      sx={{
        justifyContent: 'start',
        textTransform: 'unset',
        py: 0,
        height: '37px',
        borderRadius: '7px',
        '&:hover': {
          background: params.channelId
            ? params.channelId === channel.id
              ? (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff3e' : '#22222222'
              : ''
            : '',
        },
        background: params.channelId
          ? params.channelId === channel.id
            ? (theme) =>
                theme.palette.mode === 'dark' ? '#ffffff29' : '#22222218'
            : ''
          : '',
        color: (theme) => theme.palette.text.secondary,
      }}
      startIcon={<Icon />}
    >
      <Typography
        sx={{ color: (theme) => theme.palette.text.secondary }}
        fontSize={'.95rem'}
        fontWeight={600}
      >
        {channel.name !== 'general' && role !== MemberRole.GUEST && isHovered
          ? channel.name.length > 12
            ? `${channel.name.slice(0, 12)}...`
            : channel.name
          : channel.name}
      </Typography>
      {channel.name !== 'general' && role !== MemberRole.GUEST && isHovered && (
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: 'auto' }}
        >
          <ActionTooltip title={'Edit'} placement={'top'}>
            <IconButton
              component={'span'}
              onClick={(e) => onAction(e, 'editChannel')}
              sx={{ width: '35px', height: '35px' }}
            >
              <BiEdit />
            </IconButton>
          </ActionTooltip>
          <ActionTooltip title={'Delete'} placement={'top'}>
            <IconButton
              component={'span'}
              onClick={(e) => onAction(e, 'deleteChannel')}
              sx={{ width: '35px', height: '35px' }}
            >
              <BiTrash />
            </IconButton>
          </ActionTooltip>
        </motion.div>
      )}
      {channel.name === 'general' && role !== MemberRole.GUEST && (
        <Stack sx={{ ml: 'auto' }}>
          <ActionTooltip title={'Locked'} placement={'top'}>
            <Stack
              sx={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.2rem',
              }}
            >
              <BiLockAlt />
            </Stack>
          </ActionTooltip>
        </Stack>
      )}
    </Button>
  );
}
