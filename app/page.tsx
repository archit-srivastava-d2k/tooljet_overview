"use client";

import React, { useState, useEffect } from "react";
import { translations } from "./translations"; // Adjust path as needed

type Language = "en" | "hi" | "bn" | "mr" | "te" | "ta";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [droppedComponents, setDroppedComponents] = useState<string[]>([]);

  // Translation helper function
  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  // Language change handler
  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  // Drag and drop handlers
  const handleDragStart = (component: string) => {
    setDraggedElement(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedElement) {
      setDroppedComponents([...droppedComponents, draggedElement]);
      setDraggedElement(null);
    }
  };

  // Workflow animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const steps = document.querySelectorAll(".workflow-step");
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add("animate-pulse");
          setTimeout(() => {
            step.classList.remove("animate-pulse");
          }, 1000);
        }, index * 1500);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-end mb-4">
            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value as Language)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en" className="text-gray-900">English</option>
              <option value="hi" className="text-gray-900">हिंदी</option>
              <option value="bn" className="text-gray-900">বাংলা</option>
              <option value="mr" className="text-gray-900">मराठी</option>
              <option value="te" className="text-gray-900">తెలుగు</option>
              <option value="ta" className="text-gray-900">தமிழ்</option>
            </select>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900 drop-shadow-md">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 flex flex-wrap gap-2 shadow-sm">
            {["overview", "development", "testing", "eoffice", "security"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeSection === section
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-blue-100"
                  }`}
                >
                  {t(
                    `nav${section.charAt(0).toUpperCase() + section.slice(1)}`
                  )}
                </button>
              )
            )}
          </div>
        </nav>

        {/* Content Sections */}
        <main className="bg-white rounded-3xl p-8 shadow-lg">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                {t("overviewTitle")}
              </h2>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: "🚀",
                    titleKey: "rapidDevelopment",
                    descKey: "rapidDevDesc",
                  },
                  {
                    icon: "🔧",
                    titleKey: "customCodeSupport",
                    descKey: "customCodeDesc",
                  },
                  {
                    icon: "📱",
                    titleKey: "crossPlatformReady",
                    descKey: "crossPlatformDesc",
                  },
                  {
                    icon: "🔐",
                    titleKey: "enterpriseSecurity",
                    descKey: "enterpriseSecDesc",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "80%", labelKey: "fasterDevelopment" },
                  { number: "22", labelKey: "languagesSupported" },
                  { number: "99.9%", labelKey: "uptimeSLA" },
                  { number: "24/7", labelKey: "supportAvailable" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-blue-900 p-6 rounded-2xl text-center shadow-sm"
                  >
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm">{t(stat.labelKey)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Development Section */}
          {activeSection === "development" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                {t("developmentTitle")}
              </h2>

              {/* Drag & Drop Demo */}
              <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-2 border-dashed border-gray-300">
                <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">
                  {t("dragDropDemo")}
                </h3>
                <p className="text-center text-gray-600 mb-8">
                  {t("dragDropDesc")}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium mb-4 text-gray-900">
                      {t("componentsLabel")}
                    </h4>
                    <div className="space-y-3">
                      {["chart", "form", "table"].map((component) => (
                        <div
                          key={component}
                          draggable
                          onDragStart={() => handleDragStart(component)}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-move hover:bg-blue-700 hover:scale-105 transition-all duration-200 select-none"
                        >
                          {t(component)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-2xl text-gray-500">→</div>

                  <div className="flex-1">
                    <h4 className="text-lg font-medium mb-4 text-gray-900">
                      {t("appCanvasLabel")}
                    </h4>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="min-h-48 border-2 border-dashed border-gray-300 rounded-lg bg-white flex flex-col items-center justify-center p-6 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      {droppedComponents.length === 0 ? (
                        <p className="text-gray-600">{t("dropHere")}</p>
                      ) : (
                        <div className="space-y-2">
                          {droppedComponents.map((comp, index) => (
                            <div
                              key={index}
                              className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                            >
                              {t("addedComponent")} {t(comp)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Flow */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                {[
                  { titleKey: "visualDesigner", subKey: "visualDesignerSub" },
                  { titleKey: "codeEditor", subKey: "codeEditorSub" },
                  { titleKey: "devSecOps", subKey: "devSecOpsSub" },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-blue-50 text-blue-900 p-6 rounded-2xl text-center flex-1 min-w-48 shadow-sm">
                      <h4 className="font-semibold mb-2">{t(item.titleKey)}</h4>
                      <p className="text-sm">{t(item.subKey)}</p>
                    </div>
                    {index < 2 && (
                      <div className="text-2xl text-gray-500 transform md:rotate-0 rotate-90">
                        ⟷
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Development Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: "🎨",
                    titleKey: "visualDevelopment",
                    descKey: "visualDevDesc",
                  },
                  {
                    icon: "🔗",
                    titleKey: "apiIntegration",
                    descKey: "apiIntegDesc",
                  },
                  {
                    icon: "🗄️",
                    titleKey: "databaseSupport",
                    descKey: "databaseDesc",
                  },
                  {
                    icon: "📚",
                    titleKey: "autoDocumentation",
                    descKey: "autoDocDesc",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testing Section */}
          {activeSection === "testing" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                {t("testingTitle")}
              </h2>

              {/* Workflow Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
                {[
                  { titleKey: "testCreation", subKey: "testCreationSub" },
                  { titleKey: "execution", subKey: "executionSub" },
                  { titleKey: "reporting", subKey: "reportingSub" },
                  { titleKey: "integration", subKey: "integrationSub" },
                ].map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="workflow-step bg-white border-2 border-gray-300 p-6 rounded-2xl text-center flex-1 min-w-32 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm">
                      <h4 className="font-semibold mb-2 text-gray-900">{t(step.titleKey)}</h4>
                      <p className="text-sm text-gray-600">{t(step.subKey)}</p>
                    </div>
                    {index < 3 && (
                      <div className="text-xl text-gray-400 transform md:rotate-0 rotate-90">
                        →
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Testing Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: "🎯",
                    titleKey: "noCodeTesting",
                    descKey: "noCodeTestDesc",
                  },
                  {
                    icon: "🌐",
                    titleKey: "multiPlatformSupport",
                    descKey: "multiPlatformDesc",
                  },
                  {
                    icon: "📊",
                    titleKey: "advancedReporting",
                    descKey: "advancedReportDesc",
                  },
                  {
                    icon: "🔄",
                    titleKey: "testManagement",
                    descKey: "testMgmtDesc",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Testing Workflow Integration */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
                  {t("testingWorkflowTitle")}
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {[
                    { titleKey: "versionControl", subKey: "versionControlSub" },
                    { titleKey: "testSuite", subKey: "testSuiteSub" },
                    { titleKey: "issueTracking", subKey: "issueTrackingSub" },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-blue-50 text-blue-900 p-6 rounded-2xl text-center flex-1 min-w-48 shadow-sm">
                        <h4 className="font-semibold mb-2">{t(item.titleKey)}</h4>
                        <p className="text-sm">{t(item.subKey)}</p>
                      </div>
                      {index < 2 && (
                        <div className="text-2xl text-gray-500 transform md:rotate-0 rotate-90">
                          ⟷
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* E-Office Section */}
          {activeSection === "eoffice" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                {t("eofficeTitle")}
              </h2>

              {/* Approval Workflow */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
                {[
                  { titleKey: "l1Approval", subKey: "l1ApprovalSub" },
                  { titleKey: "l2Approval", subKey: "l2ApprovalSub" },
                  { titleKey: "l3Approval", subKey: "l3ApprovalSub" },
                  { titleKey: "archive", subKey: "archiveSub" },
                ].map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="workflow-step bg-white border-2 border-gray-300 p-6 rounded-2xl text-center flex-1 min-w-32 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm">
                      <h4 className="font-semibold mb-2 text-gray-900">{t(step.titleKey)}</h4>
                      <p className="text-sm text-gray-600">{t(step.subKey)}</p>
                    </div>
                    {index < 3 && (
                      <div className="text-xl text-gray-400 transform md:rotate-0 rotate-90">
                        →
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* E-Office Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: "📁",
                    titleKey: "documentManagement",
                    descKey: "docMgmtDesc",
                  },
                  {
                    icon: "📋",
                    titleKey: "eofficeIntegration",
                    descKey: "eofficeIntegDesc",
                  },
                  {
                    icon: "🔄",
                    titleKey: "fileMovementTracking",
                    descKey: "fileTrackDesc",
                  },
                  {
                    icon: "✅",
                    titleKey: "multiLevelApprovals",
                    descKey: "multiLevelDesc",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Approval Workflow Demo */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
                  {t("approvalWorkflowTitle")}
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                  {[
                    { titleKey: "documentUpload", subKey: "docUploadSub" },
                    { titleKey: "approvalChain", subKey: "approvalChainSub" },
                    { titleKey: "finalStatus", subKey: "finalStatusSub" },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-blue-50 text-blue-900 p-6 rounded-2xl text-center flex-1 min-w-48 shadow-sm">
                        <h4 className="font-semibold mb-2">{t(item.titleKey)}</h4>
                        <p className="text-sm">{t(item.subKey)}</p>
                      </div>
                      {index < 2 && (
                        <div className="text-2xl text-gray-500 transform md:rotate-0 rotate-90">
                          →
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">
                    {t("integratedReporting")}
                  </h4>
                  <p className="text-gray-600">{t("reportingDesc")}</p>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                {t("securityTitle")}
              </h2>

              {/* Security Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: "🛡️",
                    titleKey: "owaspCompliance",
                    descKey: "owaspDesc",
                  },
                  {
                    icon: "🤖",
                    titleKey: "aiAssistedSecurity",
                    descKey: "aiSecDesc",
                  },
                  {
                    icon: "🔒",
                    titleKey: "encryptionProtocols",
                    descKey: "encryptionDesc",
                  },
                  {
                    icon: "📊",
                    titleKey: "siemIntegration",
                    descKey: "siemDesc",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Security Architecture */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
                  {t("securityArchitecture")}
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                  {[
                    { titleKey: "codeAnalysis", subKey: "codeAnalysisSub" },
                    {
                      titleKey: "vulnerabilityCheck",
                      subKey: "vulnerabilityCheckSub",
                    },
                    { titleKey: "deployment", subKey: "deploymentSub" },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-blue-50 text-blue-900 p-6 rounded-2xl text-center flex-1 min-w-48 shadow-sm">
                        <h4 className="font-semibold mb-2">{t(item.titleKey)}</h4>
                        <p className="text-sm">{t(item.subKey)}</p>
                      </div>
                      {index < 2 && (
                        <div className="text-2xl text-gray-500 transform md:rotate-0 rotate-90">
                          →
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Compliance Features */}
                <div>
                  <h4 className="text-xl font-semibold mb-6 text-center text-gray-900">
                    {t("complianceFeatures")}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { titleKey: "dataPrivacy", subKey: "dataPrivacySub" },
                      { titleKey: "accessControl", subKey: "accessControlSub" },
                      { titleKey: "auditTrails", subKey: "auditTrailsSub" },
                      { titleKey: "secureAPIs", subKey: "secureApisSub" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-xl text-center shadow-sm"
                      >
                        <div className="font-semibold mb-2 text-gray-900">
                          {t(item.titleKey)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {t(item.subKey)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}