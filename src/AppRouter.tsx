import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NewsByCategories from "./Pages/NewsByCategories/NewsByCategories";
import NewsByAuthors from "./Pages/NewsByAuthors/NewsByAuthors";
import NewsBySources from "./Pages/NewsBySources/NewsBySources";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<NewsByCategories />} />
            <Route path="/authors" element={<NewsByAuthors />} />
            <Route path="/sources" element={<NewsBySources />} />
        </Routes>
    )
}
export default AppRouter