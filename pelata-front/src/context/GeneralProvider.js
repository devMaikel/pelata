import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from './GeneralContext';

export default function GeneralProvider( { children }) {
  const [ grupos, setGrupos ] = useState([]);
  return (
    <GeneralContext.Provider
      value={
        {
          grupos,
          setGrupos,
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
