import { gql, useMutation, useQuery } from "@apollo/client";
import {
    faCircleExclamation,
    faSquareCheck,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Pagetitle from "../../../components/Pagetitle";
import { fetcher, fetcherWithVar } from "../../../lib/fetcher";
import validateEmail from "../../../lib/validateEmail";

export default function specificEOI() {
    const router = useRouter();
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");

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

    const [
        insertEOI,
        { data: EOI_data, loading: EOI_loading, error: EOI_error },
    ] = useMutation(
        gql`
            mutation InsertEOI($nominee_id: ID!, $program_id: ID!) {
                insertEOI(nominee_id: $nominee_id, program_id: $program_id)
            }
        `
    );

    const [
        insertNominee,
        { data: NOM_data, loading: NOM_loading, error: NOM_error },
    ] = useMutation(
        gql`
            mutation InsertNominee($contact_email: String!, $name: String!) {
                insertNominee(contact_email: $contact_email, name: $name)
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
                return 0;
            } else {
                // This nominee does not exist
                insertNominee({
                    variables: {
                        contact_email: formData.target.contact_email.value,
                        name: formData.target.name.value,
                    },
                })
                    .then((e) =>
                        insertEOI({
                            variables: {
                                nominee_id: e.data.insertNominee,
                                program_id: program_id,
                            },
                        }).catch((reason) => {
                            router.push(
                                "/programs/" +
                                    program_id +
                                    "/eoi/?postEOI=failure"
                            );
                        })
                    )
                    .catch((reason) => {
                        router.push(
                            "/programs/" + program_id + "/eoi/?postNOM=failure"
                        );
                    });
                return 1;
            }
        }
    };

    return (
        <>
            <Head>
                <title>Expression of Interest | {program_name}</title>
            </Head>
            <div className="w-full flex flex-col items-center">
                <Pagetitle>Expression of Interest</Pagetitle>
                <div className="w-7/12 flex flex-col items-center justify-start my-4 p-3 rounded-md border-4 border-dashed">
                    <div className="text-3xl font-semibold">{program_name}</div>
                    <div className="text-xl font-thin">
                        Expression of Interest
                    </div>
                    <form
                        className="flex flex-col items-center mt-4 w-1/3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e)
                                ? router.push(
                                      "/programs/" +
                                          program_id +
                                          "?postEOI=success&postNOM=success"
                                  )
                                : router.push(
                                      "/programs/" +
                                          program_id +
                                          "?postEOI=success"
                                  );
                        }}
                    >
                        <div className="relative w-full">
                            <input
                                id="contact_email"
                                className="border rounded-md p-1 m-1 w-full"
                                placeholder="Contact Email..."
                                onChange={(e) =>
                                    setEnteredEmail(e.target.value)
                                }
                            />
                            {validateEmail(enteredEmail) ? (
                                nominees.some(
                                    (e) => e.contact_email === enteredEmail
                                ) ? (
                                    nominees.some(
                                        (e) =>
                                            e.contact_email === enteredEmail &&
                                            e.name === enteredName
                                    ) ? (
                                        <div className="has-tooltip absolute -right-5 top-7">
                                            <FontAwesomeIcon
                                                className="text-cyan-500"
                                                icon={faSquareCheck}
                                            />
                                            <span className="tooltip bg-slate-100 ml-2 w-40 border border-cyan-500 text-neutral-700 rounded-lg p-1 text-xs">
                                                Nominee found.
                                            </span>
                                        </div>
                                    ) : enteredName ? (
                                        <div className="has-tooltip absolute -right-5 top-7">
                                            <FontAwesomeIcon
                                                className="text-lime-500"
                                                icon={faSquareCheck}
                                            />
                                            <span className="tooltip bg-slate-100 ml-2 w-40 border border-lime-500 text-neutral-700 rounded-lg p-1 text-xs">
                                                Email found. A new nominee will
                                                be created for {enteredName}.
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="has-tooltip absolute -right-5 top-7">
                                            <FontAwesomeIcon
                                                className="text-red-500"
                                                icon={faSquareCheck}
                                            />
                                            <span className="tooltip bg-slate-100 ml-2 w-40 border border-red-500 text-neutral-700 rounded-lg p-1 text-xs">
                                                Email found. Invalid name.
                                            </span>
                                        </div>
                                    )
                                ) : enteredName ? (
                                    <div className="has-tooltip absolute -right-5 top-7">
                                        <FontAwesomeIcon
                                            className="text-yellow-500"
                                            icon={faTriangleExclamation}
                                        />
                                        <span className="tooltip bg-slate-100 ml-2 w-40 border border-yellow-500 text-neutral-700 rounded-lg p-1 text-xs">
                                            Email not found. A new nominee will
                                            be created for {enteredName}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="has-tooltip absolute -right-5 top-7">
                                        <FontAwesomeIcon
                                            className="text-red-500"
                                            icon={faTriangleExclamation}
                                        />
                                        <span className="tooltip bg-slate-100 ml-2 w-40 border border-red-500 text-neutral-700 rounded-lg p-1 text-xs">
                                            Email not found. Invalid name.
                                        </span>
                                    </div>
                                )
                            ) : (
                                <div className="has-tooltip absolute -right-5 top-7">
                                    <FontAwesomeIcon
                                        className="text-red-500"
                                        icon={faCircleExclamation}
                                    />
                                    <span className="tooltip bg-slate-100 ml-2 w-40 border border-red-500 text-neutral-700 rounded-lg p-1 text-xs">
                                        Email address is invalid.
                                    </span>
                                </div>
                            )}
                        </div>
                        <input
                            id="name"
                            className="border rounded-md p-1 m-1"
                            placeholder="Nominee Name..."
                            onChange={(e) => setEnteredName(e.target.value)}
                        />
                        {validateEmail(enteredEmail) && enteredName ? (
                            <button
                                type="submit"
                                className="border px-10 text-lg m-1 disabled:text-neutral-400 shadow-sm disabled:shadow-inner hover:bg-slate-50 disabled:hover:bg-inherit rounded-md"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                disabled
                                type="submit"
                                className="border px-10 text-lg m-1 disabled:text-neutral-400 shadow-sm disabled:shadow-inner hover:bg-slate-50 disabled:hover:bg-inherit rounded-md"
                            >
                                Submit
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
