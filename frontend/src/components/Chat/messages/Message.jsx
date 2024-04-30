import { useAuthContext } from "../../../contexts/AuthContext";
import { extractTime } from "../../../utils/extractTime";
import useConversation from "../../../zustand/useConversation";
import { useCookies } from "react-cookie";
import { jwtDecode } from 'jwt-decode';

const Message = ({ message }) => {
	const [cookies] = useCookies(["jwt"]);
	const jwtToken = cookies.jwt;
	const decodedToken = jwtDecode(jwtToken);
	const fromMe = message.senderId === decodedToken.UserInfo.id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	//const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src="" />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
