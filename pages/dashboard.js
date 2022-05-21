import Head from "next/head";
import Pagetitle from "../components/Pagetitle";
import ProgramDashboard from "../components/ProgramsDashboard";

export default function Home() {
    return (
        <>
            <Head>
                <title>Dashboard | Excursion Portal</title>
            </Head>
            {/* Create a column with the page title and then ProgramDashboard */}
            <div className="flex flex-col items-center">
                <Pagetitle>Program Dashboard</Pagetitle>
                <ProgramDashboard />
            </div>
        </>
    );
}
