import { useState } from "react";
import Navbar from "../components/navbar"
import { Outlet } from "react-router";

function BaseLayout() {
    const [search, setSearch] = useState("")
    return (
        <>
       <Navbar setSearch={setSearch} />

        <Outlet context={{ search }} />
        </>
    )
}

export default BaseLayout