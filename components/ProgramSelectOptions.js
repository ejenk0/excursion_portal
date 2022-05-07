import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function ProgramSelectOptions() {
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
          }
          `,
        fetcher
    );
    if (prog_error) return <option>Error...</option>;
    if (!prog_data)
        return (
            <>
                <option value="loading">Loading...</option>
            </>
        );

    var buffer = [];
    for (let i = 0; i < prog_data.getPrograms.length; i++) {
        const program = prog_data.getPrograms[i];
        buffer.push(
            <option key={program.program_id} value={program.program_id}>
                {program.program_name}
            </option>
        );
    }

    return <>{buffer}</>;
}
