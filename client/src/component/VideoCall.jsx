// VideoCall.jsx
import React, { useEffect, useState } from 'react';
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import axios from 'axios'
import '@stream-io/video-react-sdk/dist/css/styles.css';

const baseUrl = import.meta.env.VITE_API_URL


const VideoCall = ({ userId, callId ,name}) => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const initCall = async () => {
      try {
        const res = await axios.post(`${baseUrl}/api/stream/get-token`, {}, { withCredentials: true });

        console.log(res)

        if (!res) throw new Error('Token fetch failed');
        const token = res.data.token;
        const apiKey = res.data.apiKey
        const userId = res.data.userId

        const user = {
          id: userId,
          name,
          image: `https://getstream.io/random_svg/?id=${userId}&name=${userId}`,
        };

        const videoClient = new StreamVideoClient({ apiKey, user, token });
        const streamCall = videoClient.call('default', callId);
        await streamCall.join({ create: true });

        setClient(videoClient);
        setCall(streamCall);
      } catch (err) {
        console.error('Stream init error:', err);
      }
    };

    initCall();
  }, [userId, callId]);

  if (!client || !call) return <div>Loading video call...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

export default VideoCall;

const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Joining call...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
