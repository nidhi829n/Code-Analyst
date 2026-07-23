import { useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

import { FaCopy, FaCheck } from "react-icons/fa";

import Editor from "react-simple-code-editor";
import prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";

function ImprovedCodeCard({
    code = "",
    language = "javascript",
}) {

    const [copied, setCopied] =
        useState(false);

    async function copyCode() {

        await navigator.clipboard.writeText(
            code
        );

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 2000);

    }

    return (

        <Card>

            <div
                className="flex justify-between items-center mb-5"
            >

                <SectionTitle>

                    💻 Improved Code

                </SectionTitle>

                <button
                    onClick={copyCode}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
                >

                    {

                        copied

                            ?

                            <>

                                <FaCheck />

                                Copied

                            </>

                            :

                            <>

                                <FaCopy />

                                Copy

                            </>

                    }

                </button>

            </div>

            <div
                className="rounded-xl overflow-hidden border border-zinc-800"
            >

                <Editor

                    value={code}

                    onValueChange={() => {}}

                    readOnly

                    highlight={(code) =>

                        prism.highlight(

                            code,

                            prism.languages.javascript,

                            "javascript"

                        )

                    }

                    padding={18}

                    style={{

                        background: "#0f172a",

                        color: "white",

                        minHeight: "350px",

                        fontFamily: '"Fira Code", monospace',

                        fontSize: 15,

                    }}

                />

            </div>

        </Card>

    );

}

export default ImprovedCodeCard;