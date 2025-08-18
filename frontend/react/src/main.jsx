import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'

// Initialize Keycloak instance
const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'myrealm',
  clientId: 'demo'
})

createRoot(document.getElementById('root')).render(
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        checkLoginIframe: true,
        pkceMethod: 'S256'
      }}
    >
      <App />
    </ReactKeycloakProvider>,
)
