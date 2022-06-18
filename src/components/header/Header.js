import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button";
import "./Header.css"

function Header(props) {
    const { ROUTES } = props;

    const [activePage, setActivePage] = useState(ROUTES.GRAPH2D.path);

    const navigate = useNavigate();

    return (
        <div className="header">
            {Object.values(ROUTES).map(route => 
                route.path !== ROUTES.MAIN.path ?
                <Button
                    key={route.path}
                    onClick={setActivePage}
                    isActive={activePage}
                    path={route.path}
                    title={route.title}
                ></Button> : '')}
            <div
                className="button"
                onClick={()=> navigate(-1)}
            >Back</div>
        </div>
    );
}

export default Header;