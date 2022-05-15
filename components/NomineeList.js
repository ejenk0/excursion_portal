import NomineeCard from "./NomineeCard";
import useSWR from "swr";
import { fetcherWithVar } from "../lib/fetcher";

export default function NomineeList({ program_id, nominees }) {
    const buffer = [];
    if (program_id) {
        const { data: nominee_data, error: nominee_error } = useSWR(
            [
                `query GetNomineesByProgram($program_id: ID!) {
            getNomineesByProgram(program_id: $program_id) {
              nominee_id
              name
              contact_email
            }
          }`,
                { program_id: program_id },
            ],
            fetcherWithVar
        );
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

        if (nominee_error)
            return (
                <div>
                    Failed to load nominee list for program_id:{" "}
                    {program_id ? program_id : "NONE PROVIDED"}
                </div>
            );
        var nominees;
        if (!nominee_data) {
            nominees = [];
        } else {
            nominees = nominee_data.getNomineesByProgram;
        }

        if (prog_error)
            return (
                <div>
                    Failed to load program details for program_id:{" "}
                    {program_id ? program_id : "NONE PROVIDED"}
                </div>
            );
        var program_name;
        var program_term;
        var program_year;
        if (!prog_data) {
            program_name = "Loading...";
            program_term = "Loading...";
            program_year = "Loading...";
        } else {
            program_name = prog_data.getProgramByID.program_name;
            program_term = prog_data.getProgramByID.term;
            program_year = prog_data.getProgramByID.year_levels;
        }

        for (let i = 0; i < nominees.length; i++) {
            const nominee = nominees[i];
            buffer.push(
                <NomineeCard
                    program_id={program_id}
                    nominee_id={nominee["nominee_id"]}
                    name={nominee["name"]}
                    email={nominee["contact_email"]}
                />
            );
        }
        if (buffer.length === 0) buffer.push(<NomineeCard emptycard={true} />);

        buffer.push(
            <NomineeCard register_interest={true} program_id={program_id} />
        );
    } else if (nominees) {
        for (let i = 0; i < nominees.length; i++) {
            const nominee = nominees[i];
            buffer.push(
                <NomineeCard
                    nominee_id={nominee.nominee_id}
                    name={nominee.name}
                    email={nominee.contact_email}
                />
            );
        }
    }

    return (
        <div className="shadow-md rounded-xl flex flex-col items-center w-full min-w-full">
            {buffer}
        </div>
    );
}
