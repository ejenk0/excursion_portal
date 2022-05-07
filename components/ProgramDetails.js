import ColumnDetails from "./ColumnDetails";
import NomineeList from "./NomineeList";

export default function ProgramDetails({ program_info }) {
    return (
        <ColumnDetails
            left={
                <>
                    <div>
                        <span className="text-3xl">
                            {program_info.program_name}
                        </span>{" "}
                        <i className="font-light ml-1 text-lg">
                            ({program_info.event_type})
                        </i>
                    </div>
                    <div>
                        <span className="font-semibold">Term:</span>{" "}
                        {program_info.term}
                    </div>
                    <div>
                        <span className="font-semibold">Year level(s):</span>{" "}
                        {program_info.year_levels}
                    </div>
                    <div>
                        <span className="font-semibold">Location:</span>{" "}
                        {program_info.location}
                    </div>
                    <div>
                        <span className="font-semibold">Cost:</span>{" "}
                        {program_info.cost === "$0.00"
                            ? "Free"
                            : program_info.cost}
                    </div>
                    <div>
                        <span className="font-semibold">
                            Teacher(s) in charge:
                        </span>{" "}
                        {program_info.tic_names}
                    </div>
                    <div>
                        <span className="font-semibold">Contact:</span>{" "}
                        {program_info.tic_emails}
                    </div>

                    <div className="text-2xl underline underline-offset-4 mt-4">
                        Details
                    </div>
                    <div>{program_info.details}</div>

                    <div className="text-2xl underline underline-offset-4 mt-4">
                        Pre-requisistes
                    </div>
                    <div>
                        {program_info.pre_requisite
                            ? program_info.pre_requisite
                            : "None"}
                    </div>

                    <div className="mt-2">
                        <span className="text-2xl underline underline-offset-4">
                            Faculty
                        </span>{" "}
                        <i className="font-light ml-1">
                            ({program_info.faculty_name})
                        </i>
                    </div>
                    <div>
                        <span className="font-semibold">
                            Head of Department:
                        </span>{" "}
                        {program_info.hod_name}
                    </div>
                    <div>
                        <span className="font-semibold">Contact HOD:</span>{" "}
                        <a
                            href={"mailto:" + program_info.hod_email}
                            className="text-blue-500 underline"
                        >
                            {program_info.hod_email}
                        </a>
                    </div>

                    <div className="text-2xl underline underline-offset-4 mt-4">
                        Consolidating Features
                    </div>
                    <div>
                        {program_info.consolidating_features
                            ? program_info.consolidating_features
                            : "None"}
                    </div>
                </>
            }
            right={
                <>
                    <div className="text-3xl font-semibold mb-2">Nominees</div>
                    <NomineeList program_id={program_info.program_id} />
                </>
            }
        />
    );
}
