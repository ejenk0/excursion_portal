import { gql, useMutation, useQuery } from "@apollo/client";
import {
    faSquareCheck,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Pagetitle from "../../../components/Pagetitle";
import { fetcher, fetcherWithVar } from "../../../lib/fetcher";

export default function specificEOI() {
    const router = useRouter();
    const [enteredEmail, setEnteredEmail] = useState(0);

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

    const { data: nom_data, error: nom_error } = useSWR(
        `query GetNominees {
            getNominees {
              nominee_id
              contact_email
              name
            }
          }
          `,
        fetcher
    );

    const [insertEOI, { data, loading, error }] = useMutation(
        gql`
            mutation InsertEOI($nominee_id: ID!, $program_id: ID!) {
                insertEOI(nominee_id: $nominee_id, program_id: $program_id)
            }
        `
    );

    var program_name;
    var program_term;
    var program_year;
    if (!prog_data) {
        program_name = "Loading...";
    } else {
        program_name = prog_data.getProgramByID.program_name;
    }
    if (nom_error) return <div>Error fetching nominees</div>;
    if (nom_data) {
        var nominees = nom_data.getNominees;
    } else {
        nominees = [];
    }

    const handleSubmit = (formData) => {
        if (nom_data) {
            const n = nominees.filter(
                (e) =>
                    e.contact_email === formData.target.contact_email.value &&
                    e.name === formData.target.name.value
            );
            if (n.length > 0) {
                // This nominee already exists
                // Execute a raw graphql query to insert a new EOI
                insertEOI({
                    variables: {
                        nominee_id: n[0].nominee_id,
                        program_id: program_id,
                    },
                }).catch((reason) => {
                    router.push(
                        "/programs/" + program_id + "/eoi/?postEOI=failure"
                    );
                });
            }
        }
    };

    const handleEmailChange = (formData) => {
        setEnteredEmail(formData.target.value);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <Pagetitle>Expression of Interest</Pagetitle>
            <div className="w-7/12 flex flex-col items-center justify-start my-4 p-3 rounded-md border-4 border-dashed">
                <div className="text-3xl font-semibold">{program_name}</div>
                <div className="text-xl font-thin">Expression of Interest</div>
                <form
                    className="flex flex-col items-center mt-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                        router.push(
                            "/programs/" + program_id + "?postEOI=success"
                        );
                    }}
                >
                    <div className="relative">
                        <input
                            id="contact_email"
                            className="border rounded-md p-1 m-1"
                            placeholder="Contact Email..."
                            onChange={handleEmailChange}
                        />
                        {/* {nominees.some(
                            (e) => e.contact_email === enteredEmail
                        ) ? (
                            <FontAwesomeIcon
                                className="absolute -right-4 top-3 text-lime-500"
                                icon={faSquareCheck}
                            />
                        ) : (
                            <FontAwesomeIcon
                                className="absolute -right-4 top-3 text-yellow-500"
                                icon={faTriangleExclamation}
                            />
                        )} */}
                    </div>
                    <input
                        id="name"
                        className="border rounded-md p-1 m-1"
                        placeholder="Nominee Name..."
                    />
                    <button
                        type="submit"
                        className="border px-10 text-lg m-1 hover:bg-slate-50 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
