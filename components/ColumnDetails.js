export default function ColumnDetails({ left, right }) {
    return (
        <div className="w-9/12 2xl:w-7/12 flex flex-col lg:flex-row rounded-b-lg border-b-4 border-x-4 border-cyan-600">
            <div className="basis-1/2 flex flex-col p-5">{left}</div>
            <div className="basis-1/2 flex flex-col border-t-2 lg:border-t-0 lg:border-l-2 border-cyan-600 border-dotted justify-start items-center p-3">
                {right}
            </div>
        </div>
    );
}
