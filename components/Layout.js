import Navbar from "./Navbar";
import Toast from "./Toast";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Toast />
            {children}
        </>
    );
}
