import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
    const nevigate=useNavigate()
    return (
        <button>
            <Button type='back' onClick={(e)=>{
                      e.preventDefault();
                    nevigate(-1)}}>&larr; Back</Button>
        </button>
    )
}

export default BackButton
