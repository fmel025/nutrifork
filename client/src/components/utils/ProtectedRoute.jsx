import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
    canActivate,
    redirectPath = '/iniciar-sesion'
}) {
    if (canActivate === null) {
        return <div>Loading...</div>
    }

    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet />
}