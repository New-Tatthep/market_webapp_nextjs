export async function POST(request) {
  try {
    const body = await request.json();
    const token = request.headers.get('x-auth-token');
    const backendResponse = await fetch('http://localhost:5001/market-service/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    return Response.json(data, { status: backendResponse.status });
  } catch (error) {
    return Response.json({ status_code: 500, message: error.message }, { status: 500 });
  }
}