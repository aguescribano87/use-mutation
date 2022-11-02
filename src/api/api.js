import axios from "axios"

const API = "http://localhost:4000"

export const getTweets = async () => {
    const { data } = await axios.get(`${API}/tweets`)
    return data
}

export const createTweet = async (tweet) => {
    const { data } = await axios.post(`${API}/tweets`, tweet);
    return data;
};