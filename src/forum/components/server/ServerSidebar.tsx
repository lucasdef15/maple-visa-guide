import { useContext, useEffect, useState } from 'react';
import { ForumContext } from '../../../contexts/ForumContext';
import axios from 'axios';
import config from '../../../utilities/config';
import { useParams } from 'react-router-dom';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { Box, Stack } from '@mui/material';
import ServerHeader from './ServerHeader';
import ServerSearch from './ServerSearch';
import { BsShieldFillCheck, BsShieldFillExclamation } from 'react-icons/bs';
import { AiOutlineAudio } from 'react-icons/ai';
import { BiHash } from 'react-icons/bi';
import { LuVideo } from 'react-icons/lu';
import { Channel, ChannelType, Member, MemberRole } from '../../../../types';

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <BiHash />,
  [ChannelType.AUDIO]: <AiOutlineAudio />,
  [ChannelType.VIDEO]: <LuVideo />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <BsShieldFillCheck style={{ color: '#4f46e5' }} />,
  [MemberRole.ADMIN]: <BsShieldFillExclamation style={{ color: '#f43f5e' }} />,
};

export default function ServerSidebar({ serverId }: ServerSidebarProps) {
  const { profile, servers } = useContext(ForumContext);

  const { darkMode } = useContext(DarkModeContext);

  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.APP_BASE_URL}/server/${id}`);
        setServer(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchServer();
  }, [id, servers]);

  const textChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'TEXT'
  );
  const audioChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'AUDIO'
  );
  const videoChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'VIDEO'
  );
  const members = server?.data?.serverComp.members.filter(
    (member: any) => member.profileId !== profile.data.profile.id
  );

  const role = server?.data?.serverComp.members.find(
    (member: any) => member.profileId === profile.data.profile.id
  )?.role;

  return (
    <Stack
      direction={'column'}
      sx={{
        width: '100%',
        height: '100%',
        color: darkMode ? '#fff' : '',
        background: darkMode ? '#2B2D31' : '#F2F3F5',
      }}
    >
      <ServerHeader
        server={server?.data?.serverComp}
        role={role}
        isLoading={loading}
      />
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          px: 1,
        }}
      >
        <Stack sx={{ mt: 2 }}>
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map((channel: Channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[
                    ChannelType[channel.type] as unknown as ChannelType
                  ],
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels?.map((channel: Channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[
                    ChannelType[channel.type] as unknown as ChannelType
                  ],
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map((channel: Channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[
                    ChannelType[channel.type] as unknown as ChannelType
                  ],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member: Member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[
                    MemberRole[
                      member.role as unknown as number
                    ] as unknown as MemberRole
                  ],
                })),
              },
            ]}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
