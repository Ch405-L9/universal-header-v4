import { next } from '@vercel/edge';

export const config = {
  matcher: ['/badgr_test', '/badgr_test/:path*'],
};

export default function middleware(request: Request) {
  const authorization = request.headers.get('authorization');

  if (authorization?.startsWith('Basic ')) {
    try {
      const decoded = atob(authorization.slice('Basic '.length));
      const separatorIndex = decoded.indexOf(':');

      if (separatorIndex !== -1) {
        const user = decoded.slice(0, separatorIndex);
        const pass = decoded.slice(separatorIndex + 1);

        if (
          user === process.env.BADGR_TEST_USER &&
          pass === process.env.BADGR_TEST_PASS
        ) {
          return next();
        }
      }
    } catch {
      // Malformed authentication data is treated as unauthorized.
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="badgr_test"',
      'Cache-Control': 'no-store',
    },
  });
}
