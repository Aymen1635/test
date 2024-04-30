import { useContext, useEffect, useState } from 'react'
import toast from "react-hot-toast";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useCookies } from 'react-cookie';



const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const { auth } = useContext(AuthContext);
	const [cookies] = useCookies(["jwt"]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("http://localhost:5000/users/sidebar", {
					headers: {
					  Authorization: `Bearer ${auth.accessToken}`,
					},
				  });
				const data = await res.json();
				console.log(data);
				if (data.error) {
					console.log(data.error)
					throw new Error(data.error);
					
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
		console.log(conversations)
	}, [auth.accessToken, cookies.jwt]);

	return { loading, conversations };
};
export default useGetConversations;
