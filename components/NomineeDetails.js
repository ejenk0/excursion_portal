import ColumnDetails from "./ColumnDetails";

export function NomineeDetails({ nominee_info }) {
    return (
        <ColumnDetails
            left={
                <>
                    <div>
                        <span className="font-semibold">Name:</span>{" "}
                        {nominee_info.name}
                    </div>
                    <div>
                        <span className="font-semibold">Contact Email:</span>{" "}
                        <a
                            href={"mailto:" + nominee_info.contact_email}
                            className="text-blue-500 underline"
                        >
                            {nominee_info.contact_email}
                        </a>
                    </div>
                </>
            }
        />
    );
}
