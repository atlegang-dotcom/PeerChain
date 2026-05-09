const BACKEND_URL = '<YOUR_BACKEND_API_URL>';

export async function requestNonce(walletAddress) {
  const res = await fetch(`${BACKEND_URL}/auth/nonce`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress })
  });
  if (!res.ok) throw new Error('Failed to get nonce');
  const data = await res.json();
  return data.nonce;
}

export async function verifySignature(walletAddress, signature) {
  const res = await fetch(`${BACKEND_URL}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, signature })
  });
  if (!res.ok) throw new Error('Authentication failed');
  const data = await res.json();
  return data.token;
}
