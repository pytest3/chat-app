import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Auth0ProviderLayout() {
  console.log("Auth0ProviderLayout component rendered");

  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return <LoadingSpinner />;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope:
          "read:current_user update:current_user_metadata openid profile email username",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <Outlet />
    </Auth0Provider>
  );
}
