import { gql, useQuery } from "@apollo/client"

const GET_AUTHORS = gql `
    query GetAuthors {
        authors {
            id
            name
            age 
        }
    }
`

const Author = () => {
    const {data} = useQuery(GET_AUTHORS)
    const authors = data?.authors
    console.log("Author", authors)
    return (
        <div>
            {authors?.map((author) =>(
                <h1 key = {author.id}>{author.name}</h1>
            ))}
        </div>
    )
}

export default Author