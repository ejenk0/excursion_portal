import { useState } from "react";
import useSWR from "swr";
import NomineeList from "../../components/NomineeList";
import Pagetitle from "../../components/Pagetitle";
import { fetcher } from "../../lib/fetcher";

export default function NomineeSearch() {
    const { data: nominee_data, error: nominee_error } = useSWR(
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

    var nominees;
    if (nominee_data) {
        nominees = nominee_data.getNominees;
    } else {
        nominees = [];
    }

    const [filteredNominees, setFilteredNominees] = useState("unfiltered");
    var filters = {
        name: "",
        contact_email: "",
    };

    const updateFilters = () => {
        setFilteredNominees(
            nominees
                .filter((n) => n.name.includes(filters.name))
                .filter((n) => n.contact_email.includes(filters.contact_email))
        );
    };

    return (
        <div className="flex flex-col items-center">
            <Pagetitle>Nominees</Pagetitle>
            <div className="flex flex-col items-center border-dashed border-4 p-4 pt-2 mt-3">
                <div className="text-2xl font-semibold">Filter</div>
                <form>
                    <div>
                        <label className="font-semibold text-lg">Name: </label>
                        <input
                            onChange={(e) => {
                                filters = { ...filters, name: e.target.value };
                                updateFilters();
                            }}
                            className="border rounded-md p-1 m-1"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-lg">Email: </label>
                        <input
                            onChange={(e) => {
                                filters = {
                                    ...filters,
                                    contact_email: e.target.value,
                                };
                                updateFilters();
                            }}
                            className="border rounded-md p-1 m-1"
                        />
                    </div>
                </form>
            </div>
            <div className="w-5/12 mt-4 p-4 pt-2 border-dashed border-4 flex flex-col items-center">
                <div className="text-2xl font-semibold mb-2">Nominees</div>
                <NomineeList
                    nominees={
                        filteredNominees !== "unfiltered"
                            ? filteredNominees
                            : nominees
                            ? nominees
                            : []
                    }
                />
            </div>
        </div>
    );
}
