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
    if (!prog_data)
        program_info = {
            program_id: <Loading />,
            program_name: <Loading />,
            year_levels: <Loading />,
            event_type: <Loading />,
            term: <Loading />,
            cost: <Loading />,
            location: <Loading />,
            pre_requisite: <Loading />,
            faculty_name: <Loading />,
            hod_email: <Loading />,
            hod_name: <Loading />,
            tic_emails: <Loading />,
            tic_names: <Loading />,
            details: <Loading />,
            consolidating_features: <Loading />,
        };
    else program_info = prog_data.getProgramByID;

    return (
        <div className="flex flex-col items-center">
            <Pagetitle>{program_info.program_name}</Pagetitle>
            <ProgramDetails program_info={program_info} />
        </div>
    );
}
