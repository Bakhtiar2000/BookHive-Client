import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-orange-500 text-lg py-2 inline-block"
                    : "hover:underline text-lg hover:text-orange duration-300 py-2 inline-block"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;