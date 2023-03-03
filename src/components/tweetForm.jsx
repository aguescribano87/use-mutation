import { useEffect, useRef } from "react"
import { useMutation, useQueryClient } from "react-query"
import { createTweet } from "../api/api"

export const TweetForm = () => {

    const formRef = useRef(null)
    const nameRef = useRef(null)

    const queryClient = useQueryClient()

    const { mutate, isLoading, isSuccess, data, reset } = useMutation(createTweet, {
        onSuccess: (tweet) => {
            queryClient.setQueriesData('tweets', prevPost => prevPost.concat(tweet))
            queryClient.invalidateQueries('tweets')
        }
    })

    useEffect(()=>{
        nameRef.current.focus()
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()

        mutate({
            name: event.target.elements.name.value,
            text: event.target.elements.text.value
        }, {
            onSuccess: () => {
                formRef.current.reset()
            }
        })

    }

    return (
        <>
            <form ref={formRef} className="formCont" onSubmit={handleSubmit}>
                <input ref={nameRef} name="name" placeholder="Nombre" />
                <textarea name="text" placeholder="Tweet" maxLength={120} />
                <button type="submit">{isLoading ? "Enviando..." : "Tweetear"}</button>
            </form>
            {
                isSuccess && <div>
                    <p>el teweet de {data.name} fue creado correctamente el id:{data.id}</p>
                    <button onClick={reset}>ok</button>
                </div>
            }
        </>
    )
}