import React, { useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export default function VideoCall({ channel = "testChannel" }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const client = useRef(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  ).current;
  const localTracks = useRef([]);

  const appId = process.env.REACT_APP_AGORA_APP_ID;

  useEffect(() => {
    const init = async () => {
      if (!appId) {
        console.error("Agora APP_ID is missing! Check your .env file.");
        return;
      }

      try {
        await client.join(appId, channel, null, null);

        const [microphoneTrack, cameraTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();
        localTracks.current = [microphoneTrack, cameraTrack];

        cameraTrack.play(localVideoRef.current);

        await client.publish(localTracks.current);
        console.log("Local video published");

        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === "video") {
            user.videoTrack.play(remoteVideoRef.current);
          }
          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        });

        client.on("user-unpublished", (user) => {
          console.log("User unpublished:", user.uid);
        });
      } catch (err) {
        console.error("Agora initialization error:", err);
      }
    };

    init();

    return async () => {
      try {
        await client.leave();
        localTracks.current.forEach((track) => track.close());
      } catch (err) {
        console.error("Error leaving Agora channel:", err);
      }
    };
  }, [channel, appId, client]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-inter">
      {/* Local Stream */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold text-green-700 mb-4 font-poppins flex items-center">
          🎥 Local Stream
        </h3>
        <div
          ref={localVideoRef}
          className="w-full h-72 bg-black rounded-xl flex items-center justify-center text-white font-inter text-base"
        >
          Waiting for camera...
        </div>
      </div>

      {/* Remote Stream */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold text-green-700 mb-4 font-poppins flex items-center">
          👨‍⚕️ Remote Stream
        </h3>
        <div
          ref={remoteVideoRef}
          className="w-full h-72 bg-black rounded-xl flex items-center justify-center text-white font-inter text-base"
        >
          Waiting for remote user...
        </div>
      </div>
    </div>
  );
}
