import { Navigate, Outlet } from "react-router-dom";

export default function AuthRedirectRoute({
    isAuthenticated,
    redirectPath = '/'
}) {
    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet />
}