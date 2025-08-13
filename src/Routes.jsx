import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

import UserLogin from "pages/user-login";
import DesignPreviewExport from "pages/design-preview-export";
import MainDashboard from "pages/main-dashboard";
import UserProfileSettings from "pages/user-profile-settings";
import UserRegistration from "pages/user-registration";
import DesignEditor from "pages/design-editor";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<DesignEditor />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/design-preview-export" element={<DesignPreviewExport />} />
          <Route path="/main-dashboard" element={<MainDashboard />} />
          <Route path="/user-profile-settings" element={<UserProfileSettings />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/design-editor" element={<DesignEditor />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
