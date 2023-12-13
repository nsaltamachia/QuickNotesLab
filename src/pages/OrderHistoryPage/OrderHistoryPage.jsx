import { checkToken } from '../../utilities/users-service';

export default function OrderHistoryPage() {
    async function handleCheckToken() {
        // Check if their token is still valid on page load
        const expDate = await checkToken();
        console.log(expDate);
        
    }


    return (
        <>
        <h1>OrderHistoryPage</h1>
        <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
    )

}