import { useRouter } from "next/router";
import React from "react";
import { withLayout } from "../layout/Layout";

function Search(): JSX.Element {
    const router = useRouter();

    return <div>You were looking for "{router.query.q}"</div>;
}

export default withLayout(Search);
