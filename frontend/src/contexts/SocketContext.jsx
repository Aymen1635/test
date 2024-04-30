import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import io from "socket.io-client";
import { useCookies } from "react-cookie";
import { jwtDecode } from 'jwt-decode';
const SocketContext = createContext();


export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const [cookies] = useCookies(["jwt"]);
	const { auth, setAuth } = useContext(AuthContext);
 

	useEffect(() => {
		if (auth) {
			const socket = io("http://localhost:5000", {
				query: {
					userId: auth.userId,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [auth]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
