import { BiEdit, BiHash, BiTrash } from 'react-icons/bi';
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
import { useState } from 'react';

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

  const params = useParams();
  const navigate = useNavigate();

  const Icon: React.ComponentType =
    iconMap[ChannelType[channel.type] as unknown as ChannelType];

  if (!Icon) {
    return null;
  }

  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        justifyContent: 'start',
        textTransform: 'unset',
        py: 0,
        height: '40px',
        borderRadius: '5px',
      }}
      startIcon={<Icon />}
    >
      <Typography>{channel.name}</Typography>
      {channel.name !== 'general' && role !== MemberRole.GUEST && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: 'auto' }}
        >
          <ActionTooltip title={'Edit'} placement={'top'}>
            <IconButton sx={{ width: '35px', height: '35px' }}>
              <BiEdit />
            </IconButton>
          </ActionTooltip>
          <ActionTooltip title={'Delete'} placement={'top'}>
            <IconButton sx={{ width: '35px', height: '35px' }}>
              <BiTrash />
            </IconButton>
          </ActionTooltip>
        </motion.div>
      )}
    </Button>
  );
}
