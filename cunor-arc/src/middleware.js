
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboardAdmin/:path*" , "/dashboardOperador/:path*"] };