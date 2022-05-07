export default function Pagetitle({ children }) {
    return (
        <div className="text-5xl lg:text-7xl font-semibold py-4 w-10/12 bg-slate-200 text-center border-b-4 border-x-4 rounded-b-lg border-cyan-600">
            {children}
        </div>
    );
}
