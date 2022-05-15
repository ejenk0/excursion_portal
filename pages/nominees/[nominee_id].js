import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { NomineeDetails } from "../../components/NomineeDetails";
import Pagetitle from "../../components/Pagetitle";
import { fetcherWithVar } from "../../lib/fetcher";

export default function nomineeDetails() {
    const router = useRouter();
    const { nominee_id } = router.query;

    const { data: nom_data, error: nom_error } = useSWR(
        [
            `query GetNomineeByNomineeID($nominee_id: ID!) {
                getNomineeByNomineeID(nominee_id: $nominee_id) {
                  contact_email
                  name
                  nominee_id
                }
              }
              `,
            { nominee_id: nominee_id },
        ],
        fetcherWithVar
    );

    if (nom_error) return <div>Error loading nominee</div>;
    if (!nom_data) return <div>Loading nominee info...</div>;
    const nominee_info = nom_data.getNomineeByNomineeID;
    return (
        <>
            <Head>
                <title>{nominee_info.name} | Nominee Details</title>
            </Head>
            <div className="flex flex-col items-center">
                <Pagetitle>Nominee Details</Pagetitle>
                <NomineeDetails nominee_info={nominee_info} />
            </div>
        </>
    );
}
