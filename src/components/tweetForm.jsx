import { useMutation, useQueryClient } from "react-query"
import { createTweet } from "../api/api"

export const TweetForm = () => {
    const queryClient = useQueryClient()
    const { mutate, isLoading, isSuccess, data, reset } = useMutation(createTweet, {
        onSuccess: (tweet) => {
            queryClient.setQueriesData('tweets', prevPost => prevPost.concat(tweet))
            queryClient.invalidateQueries('tweets')
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate({
            name: event.target.elements.name.value,
            text: event.target.elements.text.value
        }, {
            onSuccess: ()=> {
                event.target.elements.name.value = ""
                event.target.elements.text.value = ""
            }
        })
    }

    return (
        <>
            <form className="formCont" onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" />
                <textarea name="text" placeholder="Tweet" maxLength={120} />
                <button type="submit">{isLoading ? "Cargando..." : "Tweetear"}</button>
            </form>
            {
                isSuccess && <div>
                    <p>El tweet de {data.name} se cargo correctamente, con el id {data.id}</p>
                    <button onClick={reset}>OK</button>
                </div>
            }
        </>
    )
}