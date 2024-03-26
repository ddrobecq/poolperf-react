import { IconContext } from "react-icons";
import { GiPoolTriangle } from "react-icons/gi";

export default function PoolIcon(props) {
    return (
        <IconContext.Provider value={{ size:'2em' }}>
        <div>
            <GiPoolTriangle />
        </div>
        </IconContext.Provider>
    );
}
