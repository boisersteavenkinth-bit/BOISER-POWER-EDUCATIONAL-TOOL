import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

// These would normally be handled by a backend, but we'll adapt to a simple client-side flow for this prototype
// strictly for the purpose of biometric locking.

// Helper to convert string to Base64URL (simplified for prototype)
function toBase64URL(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function registerBiometric(username: string): Promise<any> {
  // 1. Get options from "server"
  // SimpleWebAuthn's startRegistration expects options where binary fields are Base64URL strings
  const options = {
    challenge: toBase64URL('random-challenge-1234567890'),
    user: {
      id: toBase64URL(username),
      name: username,
      displayName: username,
    },
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    rp: { name: 'Boiser App', id: window.location.hostname },
    timeout: 60000,
    attestation: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    }
  };

  const attestation = await startRegistration(options as any);
  return attestation;
}

export async function authenticateBiometric(): Promise<any> {
  // 1. Get options from "server"
  const options = {
    challenge: toBase64URL('random-challenge-1234567890'),
    rpId: window.location.hostname,
    timeout: 60000,
    userVerification: 'preferred',
  };

  const assertion = await startAuthentication(options as any);
  return assertion;
}
