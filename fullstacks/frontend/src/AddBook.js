import { gql, useMutation} from '@apollo/client'

const ADD_BOOK = gql `
    mutation AddBook($name: String, $genre: String, $authorId:ID!){
        createBook(name: $name, genre: $genre, authorId: $authorId){
            name 
            genre
            authorId
        }
    }
`
const AddBook = () => {
    const [addBook, {data, loading, error}] = useMutation(ADD_BOOK)
    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({variables: {name: "Co be ban diem ",genre:"Truyen ngan", authorId:"64633cfae58b391d4bebfbe1"   }});
        console.log(data)
    }
    console.log("Err",error)
    
    return (
        <div>
            <form style = {{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            padding: '50px',
        }} onSubmit = {handleSubmit}>
                <label>Book Name</label>
                <input type="text"/>
                <label>Book Genre</label>
                <input type="text"/>
                <button type = "submit">Add new Book </button>
            </form>
        </div>
    )
}
export default AddBook