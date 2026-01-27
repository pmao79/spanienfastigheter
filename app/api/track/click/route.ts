import { NextRequest, NextResponse } from "next/server";

// Note: Simple redirection for now. 
// In a real production app, we would ideally use a mutation to log this asynchronously 
// or queue it, but Next.js Edge functions might be limited.
// For now, we just redirect. To properly track, we'd need to call Convex.

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const redirectUrl = searchParams.get("redirect") || "/";
    const mailingId = searchParams.get("mailingId");
    const propertyId = searchParams.get("propertyId");

    // TODO: Fire and forget tracking pixel/mutation if possible.
    // Since we can't easily import `convex` client here without auth context context in a simple GET route 
    // (unless we use http client), we will skip backend logging for this iteration 
    // and focus on the redirection to ensure user experience isn't broken.

    // Future: Use fetch to call a Convex HTTP Action to log the click.

    return NextResponse.redirect(new URL(redirectUrl, request.url));
}
