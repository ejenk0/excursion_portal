import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function TestComp() {
    const { data, error } = useSWR(`{time}`, fetcher);
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
    return <div>{data.time}</div>;
}
