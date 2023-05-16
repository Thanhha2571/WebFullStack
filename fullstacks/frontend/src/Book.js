import {gql, useQuery} from "@apollo/client"

const GET_BOOKS = gql `
    query GetBooks {
        books {
            id
            name
            genre
        }
    }
`;


const Book = ({onBookSelected}) => {
    const { data } = useQuery(GET_BOOKS);
    const books = data?.books;
    console.log("Books",books)
    return (
        <div>
            {books?.map((book) => (
                <h1 key = {book.id}>{book.name}</h1>
            ) )}
        </div>
    )
}
export default Book;