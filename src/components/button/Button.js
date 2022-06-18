import { useNavigate } from "react-router-dom";
import "./Button.css"

function Button(props) {
    const { title, path, isActive, onClick } = props;

    const navigate = useNavigate();
    const onClickHandler = () => {
        onClick(path);
        navigate(path);
    }

    return (
        <div
            className={`headerButton ${isActive === path ? 'active' : ''}`}
            onClick={() => onClickHandler()}
        >{title}</div>
    );
}

export default Button;