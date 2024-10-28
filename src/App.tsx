import './App.css'
import {useFetch} from "./hooks";

interface Data{
    name: string;
    lastName: string;
    age: number;

}
function App() {
    const url = "http://localhost:8000/api/users"
    const {data, error, loading} = useFetch<Data>(url)

    if(loading){
        return <div>Cargando...</div>
    }

    if(error){
        return <div>?Ups hay un error: {error.message}</div>
    }

    return (
        <div>{JSON.stringify(data)}</div>
    )



}

export default App
