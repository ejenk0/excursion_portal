import { gql, useMutation } from "@apollo/client";
import {
    faMagnifyingGlass,
    faPlus,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NomineeCard({
    nominee_id,
    program_id,
    name,
    email,
    emptycard = false,
    register_interest = false,
}) {
    const router = useRouter();
    const [deleteEOI, { data, loading, error }] = useMutation(
        gql`
            mutation DeleteEOI($nominee_id: ID!, $program_id: ID!) {
                deleteEOI(nominee_id: $nominee_id, program_id: $program_id)
            }
        `
    );

    if (emptycard)
        return (
            <div
                className={
                    "flex flex-row justify-between w-full h-20 border-slate-400 py-4 px-8 border-b-2 border-x-2 odd:bg-white even:bg-slate-100 first:rounded-t-lg first:border-t-2 last:rounded-b-lg first:last:rounded-lg"
                }
            >
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="text-lg font-semibold whitespace-nowrap">
                        No current nominees
                    </div>
                </div>
            </div>
        );
    else if (register_interest)
        return (
            <div
                className={
                    "flex flex-row justify-between w-full h-16 border-slate-400 border-b-2 border-x-2 hover:odd:bg-slate-200 hover:even:bg-slate-300 odd:bg-white even:bg-slate-100 first:rounded-t-lg first:border-t-2 last:rounded-b-lg first:last:rounded-lg"
                }
            >
                <div className="flex flex-col items-center justify-center w-full h-full text-2xl text-neutral-800">
                    <Link href={"/programs/" + program_id + "/eoi"}>
                        <a className="w-full h-full flex items-center justify-center hover:animate-pulse">
                            <FontAwesomeIcon icon={faPlus} />
                        </a>
                    </Link>
                </div>
            </div>
        );
    return (
        <div
            className={
                "flex flex-row justify-between w-full whitespace-nowrap h-24 border-slate-400 py-4 px-8 border-b-2 border-x-2 odd:bg-white even:bg-slate-100 first:rounded-t-lg first:border-t-2 last:rounded-b-lg first:last:rounded-lg"
            }
        >
            <div className="flex-col">
                <div className="text-xl pr-2">
                    <span className="font-semibold">Nominee name:</span>{" "}
                    <span>{name}</span>
                </div>
                <div className="text-lg pr-2">
                    <span className="font-semibold">Nominee contact:</span>{" "}
                    <a
                        href={"mailto:" + email}
                        className="text-blue-500 underline"
                    >
                        {email}
                    </a>
                </div>
            </div>
            <div className="flex-col h-full">
                <div className="hover:text-teal-500">
                    <Link href="/">
                        <a>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </a>
                    </Link>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        deleteEOI({
                            variables: {
                                nominee_id: nominee_id,
                                program_id: program_id,
                            },
                        }).catch((reason) => {
                            router.push(
                                "/programs/" +
                                    program_id +
                                    "?postDEL_EOI=failure"
                            );
                            router.reload();
                        });
                        router.push(
                            "/programs/" + program_id + "?postDEL_EOI=success"
                        );
                        router.reload();
                    }}
                >
                    <div className="mt-3 hover:text-red-600">
                        <button type="submit">
                            <a>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </a>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
