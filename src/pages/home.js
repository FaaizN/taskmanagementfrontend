import Appbar from '../components/Appbar'
import AddUser from '../components/AddUser';
import LoginUser from '../components/LoginUser';


export default function Home({userName, setUserName}) {

    return(
        <>
            <Appbar/>
            <AddUser/>
            <LoginUser userName={userName} setUserName={setUserName}/>
        
        </>
    )
}