import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import NomineeList from "./NomineeList";

export default function ProgramDashboard() {
    const { data: prog_data, error: prog_error } = useSWR(
        `query getPrograms {
            getPrograms {
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
        fetcher
    );
    if (prog_error) return <div>Error loading programs info</div>;
    if (!prog_data) return <div>Loading programs info...</div>;

    const programs = prog_data.getPrograms;

    var buffer = [];
    for (let i = 0; i < programs.length; i++) {
        const program = programs[i];
        buffer.push(
            <div className="flex flex-col items-center basis-3/12 m-2 p-1 px-3 pb-3 border-4 border-dashed h-min rounded-sm">
                <div className="self-end -mb-5 -mr-1 hover:text-teal-500">
                    <Link href={"/programs/" + program.program_id}>
                        <a>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </a>
                    </Link>
                </div>
                <div className="text-2xl font-semibold text-center">
                    {program.program_name}
                </div>
                <div className="text-sm text-neutral-600 mb-4">
                    Year {program.year_levels} | Term {program.term}
                </div>
                <NomineeList program_id={program.program_id} />
            </div>
        );
    }

    return (
        <div className="flex flex-row flex-wrap w-11/12 justify-evenly pt-3">
            {buffer}
        </div>
    );
}
