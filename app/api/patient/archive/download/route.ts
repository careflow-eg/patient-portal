import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  // Generate a mock presigned URL for demonstration purposes.
  // In a real implementation, this would communicate with MinIO/S3 or the backend API.
  const dummyPresignedUrl = `https://mock-storage.careflow.com/download/${encodeURIComponent(key)}?signature=mock_signature&expires=${Date.now() + 60000}`;

  return NextResponse.json({ url: dummyPresignedUrl }, { status: 200 });
}
