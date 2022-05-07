import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProgramSelectOptions from "../../components/ProgramSelectOptions";

export default function ProgramEOI() {
    const router = useRouter();
    const [value, setValue] = useState("4");
    useEffect(() => {
        if (router.isReady) setValue(router.query.pid);
    }, [router.isReady]);

    return (
        <>
            <form>
                <select
                    id="eoi"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                >
                    <ProgramSelectOptions />
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
