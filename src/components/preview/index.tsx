"use client";

import { BackButton } from "@/components/back-btn";
import { useState, useEffect } from "react";
import { CopyButton } from "../copy";
import { codeToHtml } from "shiki";

interface PreviewProps {
  title: string;
  description: string;
  Component: React.ComponentType;
  sourceCode: string;
  showCode?: boolean;
}

export function Preview({
  title,
  description,
  Component,
  sourceCode,
  showCode = true,
}: PreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(sourceCode, {
          lang: "tsx",
          theme: "github-dark",
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre><code>${sourceCode}</code></pre>`);
      }
    };

    if (sourceCode && showCode) {
      highlightCode();
    }
  }, [sourceCode, showCode]);

  return (
    <div className="flex max-w-full flex-col py-40 md:py-52">
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-full max-w-xs flex-col gap-20 md:max-w-xl">
          <div className="flex w-full max-w-4xl flex-col gap-8">
            <BackButton />
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-[550]">{title}</h1>
              <p className="text-secondary-foreground">{description}</p>
            </div>
          </div>

          {/* Component Tabs */}
          <div className="w-full max-w-4xl">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-4 pb-4">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`font-medium transition-colors ${
                    activeTab === "preview"
                      ? "text-foreground"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Preview
                </button>
                {showCode && (
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`font-medium transition-colors ${
                      activeTab === "code"
                        ? "text-foreground"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    Code
                  </button>
                )}
              </div>

              {showCode && <CopyButton text={sourceCode} />}
            </div>

            <div className="flex h-[300px] overflow-auto rounded-[8px] border border-neutral-900 bg-[#0d0d0d]">
              {activeTab === "preview" || !showCode ? (
                <div className="flex w-full items-center justify-center p-8">
                  <Component />
                </div>
              ) : (
                <div
                  className="w-full overflow-auto"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              )}
            </div>
          </div>
          <div className="blur-gradient-bottom pointer-events-none fixed right-0 bottom-0 left-0 h-[180px]"></div>
        </div>
      </div>
    </div>
  );
}
