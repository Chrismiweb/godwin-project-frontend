import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import { useNavigate, useParams } from "react-router-dom";

const socket = io("https://godwin-project-backend.onrender.com");

function VideoChat() {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomLink, setRoomLink] = useState(""); // New state for the room link
  const myVideo = useRef(null);
  const userVideo = useRef();
  const connectionRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  }, []);

  const createRoom = async () => {
    const response = await fetch("https://godwin-project-backend.onrender.com/create-room");
    const data = await response.json();
    setRoomId(data.roomId);
    const generatedLink = `${window.location.origin}/videoChat/join/${data.roomId}`;
    setRoomLink(generatedLink); // Set the room link
  };

  const Room = () => {
    const { id } = useParams();

    useEffect(() => {
      setRoomId(id);
      socket.emit("join-room", id);
    }, [id]);

    const callUser = (roomId) => {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (data) => {
        socket.emit("offer", { roomId, signalData: data });
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });

      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    };

    const answerCall = () => {
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (data) => {
        socket.emit("answer", { roomId, signal: data });
      });

      peer.on("stream", (currentStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });

      connectionRef.current = peer;
    };

    return (
      <div>
        <h2>Room: {id}</h2>
        {callAccepted && (
          <video ref={userVideo} autoPlay style={{ width: "300px" }} />
        )}
        <button onClick={() => callUser(id)}>Call</button>
        <button onClick={answerCall}>Answer</button>
      </div>
    );
  };

  return (
    <div>
      <h1>Video Chat</h1>
      <button onClick={createRoom}>Start a Call</button>
      <video ref={myVideo} muted autoPlay style={{ width: "300px" }} />
      {roomLink && (
        <div>
          <h3>Share this link to invite others:</h3>
          <a href={roomLink} target="_blank" rel="noopener noreferrer">
            {roomLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default VideoChat;
