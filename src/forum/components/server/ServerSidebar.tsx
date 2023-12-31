import { memo, useContext, useEffect, useState } from 'react';
import { ForumContext } from '../../../contexts/ForumContext';
import axios from 'axios';
import config from '../../../utilities/config';
import { useParams } from 'react-router-dom';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { Box, Divider, Skeleton, Stack } from '@mui/material';
import ServerHeader from './ServerHeader';
import ServerSearch from './ServerSearch';
import { BsShieldFillCheck, BsShieldFillExclamation } from 'react-icons/bs';
import { AiOutlineAudio } from 'react-icons/ai';
import { BiHash } from 'react-icons/bi';
import { LuVideo } from 'react-icons/lu';
import { Channel, ChannelType, Member, MemberRole } from '../../../../types';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import ServerMember from './ServerMember';
import _ from 'lodash';

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

const ServerSidebar = () => {
  const { profile, rerenderServerSideBar } = useContext(ForumContext);
  const { darkMode } = useContext(DarkModeContext);

  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.APP_BASE_URL}/server/${id}`);
        setServer(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServer();
  }, [id, rerenderServerSideBar]);

  const textChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'TEXT'
  );
  const audioChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'AUDIO'
  );
  const videoChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'VIDEO'
  );
  const members = server?.data?.serverComp?.members?.filter(
    (member: any) => member?.profileId !== profile?.data?.profile?.id
  );

  const role = server?.data?.serverComp?.members?.find(
    (member: any) => member?.profileId === profile?.data?.profile?.id
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
          px: 1.5,
        }}
      >
        <Stack sx={{ mt: 1 }}>
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
                  name: member?.profile.name,
                  icon: roleIconMap[
                    MemberRole[
                      member?.role as unknown as number
                    ] as unknown as MemberRole
                  ],
                })),
              },
            ]}
          />
        </Stack>

        <Divider sx={{ mb: 2, mt: 1 }} />

        {loading ? (
          <>
            <div>
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.7rem',
                  borderRadius: '5px',
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
                }}
                width={225}
              />
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.7rem',
                  borderRadius: '5px',
                  ml: 2,
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
                }}
                width={210}
              />
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.7rem',
                  borderRadius: '5px',
                  ml: 2,
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
                }}
                width={210}
              />
            </div>
            <div>
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.7rem',
                  borderRadius: '5px',
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
                }}
                width={225}
              />
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.7rem',
                  borderRadius: '5px',
                  ml: 2,
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
                }}
                width={210}
              />
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.7rem',
                  borderRadius: '5px',
                  ml: 2,
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
                }}
                width={210}
              />
            </div>
          </>
        ) : (
          <>
            {!!textChannels?.length && (
              <Stack sx={{ mb: 2 }} useFlexGap spacing={0.15}>
                <ServerSection
                  sectionType='channels'
                  channelType={ChannelType.TEXT}
                  role={role}
                  label={'Text Channels'}
                />
                {textChannels?.map((channel: Channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server?.data?.serverComp}
                  />
                ))}
              </Stack>
            )}
            {!!audioChannels?.length && (
              <Stack sx={{ mb: 2 }} useFlexGap spacing={0.5}>
                <ServerSection
                  sectionType='channels'
                  channelType={ChannelType.AUDIO}
                  role={role}
                  label={'Voice Channels'}
                />
                {audioChannels?.map((channel: Channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server?.data?.serverComp}
                  />
                ))}
              </Stack>
            )}
            {!!videoChannels?.length && (
              <Stack sx={{ mb: 2 }} useFlexGap spacing={0.5}>
                <ServerSection
                  sectionType='channels'
                  channelType={ChannelType.VIDEO}
                  role={role}
                  label={'Video Channels'}
                />
                {videoChannels?.map((channel: Channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server?.data?.serverComp}
                  />
                ))}
              </Stack>
            )}
            {!!members?.length && (
              <Stack sx={{ mb: 2 }} useFlexGap spacing={0.5}>
                <ServerSection
                  sectionType='members'
                  role={role}
                  label={'Members'}
                  server={server?.data?.serverComp}
                />
                {members?.map((member: Member) => (
                  <ServerMember
                    key={member.id}
                    member={member}
                    server={server?.data?.serverComp}
                    currentMember={profile}
                  />
                ))}
              </Stack>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
};

const ServerSidebarMemo = memo(ServerSidebar, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});

export default ServerSidebarMemo;
