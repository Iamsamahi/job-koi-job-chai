import { NextResponse } from "next/server";

const allowedParams = [
  "keyword",
  "location",
  "page",
  "experience",
  "salary",
  "jobType",
  "company",
  "industry",
];

export async function middleware(request) {
  const url = request.nextUrl;
  console.log("Middleware triggered for URL:", url.toString());

  let hasInvalidParams = false;


  url.searchParams.forEach((value, key) => {
    console.log(`Checking param: ${key}=${value}`);
    if (!allowedParams.includes(key)) {
      console.log(`Found invalid param: ${key}=${value}`);
      hasInvalidParams = true;
    }
  });

  
  if (hasInvalidParams) {
    const redirectUrl = new URL("/", request.nextUrl.origin);
    console.log("Redirecting to:", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  console.log("No invalid params, proceeding...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"], 
};