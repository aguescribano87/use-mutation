import { useQuery } from "react-query"
import { getTweets } from "../api/api"

export const TweetList = () => {
    const { data, isFetching, isLoading } = useQuery(['tweets'], getTweets)

    return (
        <div className="containerTweets">
            {(isFetching || isLoading) && <h3>Cargando...</h3>}
            {data && data.map((d, i) => (
                <div key={i} className="tweetCont">
                    <p className="tweetName">{d.name}</p>
                    <p className="tweetText">{d.text}</p>
                </div>
            ))}
        </div>
    )
}