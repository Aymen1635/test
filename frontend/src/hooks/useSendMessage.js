import {useState } from 'react'
import { useContext } from 'react';
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { AuthContext } from '../contexts/AuthContext';
import { useCookies } from 'react-cookie';

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { auth } = useContext(AuthContext);
	const [cookies] = useCookies(["jwt"]);

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`http://localhost:5000/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			},[auth.accessToken, cookies.jwt]);
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
