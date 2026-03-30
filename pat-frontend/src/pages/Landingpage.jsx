import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage(){

const navigate = useNavigate();

return(

<div>

<Navbar/>

<div className="hero">

<h1>Find Jobs & Manage Placements</h1>

<p>Placement Automation Tool for Students & Recruiters</p>

<button onClick={()=>navigate("/roles")}>
Get Started
</button>

</div>

</div>

);

}

export default LandingPage;