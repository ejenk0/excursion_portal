import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "../../components/Loading";
import Pagetitle from "../../components/Pagetitle";
import ProgramDetails from "../../components/ProgramDetails";
import { fetcherWithVar } from "../../lib/fetcher";

export default function programDetails() {
    const router = useRouter();
    const { program_id } = router.query;

    const { data: prog_data, error: prog_error } = useSWR(
        [
            `query GetProgramByID($program_id: ID!) {
            getProgramByID(program_id: $program_id) {
              program_id
              program_name
              year_levels
              event_type
              term
              cost
              location
              pre_requisite
              faculty_name
              hod_email
              hod_name
              tic_emails
              tic_names
              details
              consolidating_features
            }
          }`,
            { program_id: program_id },
        ],
        fetcherWithVar
    );

    var program_info;
    if (prog_error)
        return <div>Error loading program with ID: {program_id}</div>;
    if (!prog_data) return <div>Loading...</div>;
    else program_info = prog_data.getProgramByID;

    return (
        <>
            <Head>
                <title>{program_info.program_name} | Program Details</title>
            </Head>
            <div className="flex flex-col items-center">
                <Pagetitle>{program_info.program_name}</Pagetitle>
                <ProgramDetails program_info={program_info} />
            </div>
        </>
    );
}
