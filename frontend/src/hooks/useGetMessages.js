
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { AuthContext } from '../contexts/AuthContext';
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from 'react'

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { auth } = useContext(AuthContext);
	const [cookies] = useCookies(["jwt"]);


	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {

				const res = await fetch(`http://localhost:5000/messages/${selectedConversation._id}`, {
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					  },
				
				  });
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages,auth.accessToken, cookies.jwt]);

	return { messages, loading };
};
export default useGetMessages;
