import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

const Home = lazy(() => import('../pages/Products').then(module => ({ default: module.Products })))
const Users = lazy(() => import('../pages/User').then(module => ({ default: module.Users })));
const Medicines = lazy(() => import('../pages/Medicines').then(module => ({ default: module.Medicines })));

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Users />
                    </Suspense>
                )
            },
            {
                path: 'medicines',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Medicines />
                    </Suspense>
                )
            }
        ]
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}