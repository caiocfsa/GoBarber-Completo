import React from 'react';

import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  // Verifica se o usuario esta logado e se é uma rota privada
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  // Verifica se o usuario esta logado e se não é uma rota privada
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // Se usuario estiver auth utiliza default, senão Auth p/ logar
  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
