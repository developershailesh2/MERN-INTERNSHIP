import { Button } from "@mui/material";
import { Link } from "react-router-dom";


export function AdminIndex(){
    return(
        <div style={{height:'80vh'}}  className="d-flex container-fluid justify-content-center align-items-center">
            
            <div className="row">
                <div className="col-md-12 p-4">
                  <div>
                  <Button variant="contained" color="secondary">
                    <Link to="/register-admin" style={{textDecoration:'none'}} className="fs-5 text-white fw-bold">Register as Admin</Link>
                   </Button>
                  </div>
                    
                    <div className="mt-4">
                    <Button variant="contained" color="primary">
                        <Link to="/admin-login" style={{textDecoration:'none'}} className="fw-bold text-white fs-5">Login as Admin</Link>
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}