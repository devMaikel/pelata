import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from './GeneralContext';

export default function GeneralProvider( { children }) {
  const [ grupos, setGrupos ] = useState([]);
  const [ userData, setUserData ] = useState({});
  return (
    <GeneralContext.Provider
      value={
        {
          grupos,
          setGrupos,
          userData,
          setUserData,
        }
      }
    >
      { children }
    </GeneralContext.Provider>
  );
}

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
