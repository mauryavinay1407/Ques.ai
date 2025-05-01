import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { useMyInfoQuery } from "./redux/service";
import Home from "./pages/protected/Home";
import { Spinner } from "./components/common/Spinner";
import NavLayout from "./components/common/NavLayout";
import Projects from "./pages/protected/Projects";
import Upload from "./pages/protected/Upload";
import SideBarLayout from "./components/common/SideBarLayout";
import AccountSettings from "./pages/protected/AccountSettings";
import TranscriptEdit from "./pages/protected/TranscriptEdit";

function App() {
    // Checking user authentication status
    const { data, isError, isLoading } = useMyInfoQuery();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    // Show register page for unauthenticated users
    if (isError || !data) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<Register />} />
                </Routes>
            </BrowserRouter>
        );
    }

    // Main app routes for authenticated users
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Dashboard routes */}
                    <Route path="/" element={<NavLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                    </Route>

                    {/* Project management routes */}
                    <Route path="/project" element={<SideBarLayout />}>
                        <Route path="upload/:projectId" element={<Upload />} />
                        <Route path=":projectId/transcript/edit/:transcriptId" element={<TranscriptEdit />} />
                    </Route>

                    {/* User settings route */}
                    <Route path="/account" element={<SideBarLayout />}>
                        <Route path="settings" element={<AccountSettings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
