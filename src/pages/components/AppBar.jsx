import PropTypes from "prop-types";
import React from "react";


const AppBar = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 100px',
            backgroundColor: '#eff1ed',
            color: '#eff1ed',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }}>
            {children}
        </div>
    );
};

AppBar.propTypes = {
    children: PropTypes.node,
};

export default AppBar;