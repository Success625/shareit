// export { auth as middleware } from "@/auth"

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const forwardedHost = req.headers.get('x-forwarded-host');
  const origin = req.headers.get('origin');

  // If the forwarded host is from GitHub Codespaces, adjust the origin
  if (forwardedHost && forwardedHost.includes('.app.github.dev')) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('origin', `https://${forwardedHost}`);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
