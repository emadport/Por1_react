import { jwtDecode } from "jwt-decode";

export default function tokenExpirationTime(token: string) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = decodedToken.exp - currentTime;
    return timeUntilExpiration
}