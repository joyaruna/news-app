import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NewsByCategories from "./Pages/NewsByCategories/NewsByCategories";
import NewsByAuthors from "./Pages/NewsByAuthors/NewsByAuthors";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<NewsByCategories />} />
            <Route path="/authors" element={<NewsByAuthors />} />
        </Routes>
    )
}
export default AppRouter