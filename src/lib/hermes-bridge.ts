import { createServerFn } from "@tanstack/react-start";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

// Path to the verified Hermes Engine
const HERMES_PYTHON = `C:\\Users\\booboo\\AppData\\Local\\hermes\\hermes-agent\\venv\\Scripts\\python.exe`;
const HERMES_SCRIPT = `C:\\Users\\booboo\\AppData\\Local\\hermes\\hermes-agent\\hermes`;

export interface HermesResponse {
  output: string;
  success: boolean;
  error?: string;
}

export const runHermesTask = createServerFn().handler(async ({ query }: { query: string }): Promise<HermesResponse> => {
  try {
    // We run hermes in non-interactive mode for a single prompt
    // Note: This requires an API key in the environment (OPENAI_API_KEY, etc.)
    const command = `"${HERMES_PYTHON}" "${HERMES_SCRIPT}" "${query}" --non-interactive`;
    
    const { stdout, stderr } = await execPromise(command);

    return {
      output: stdout || stderr,
      success: !stderr.includes("Error")
    };
  } catch (error: any) {
    return {
      output: "",
      success: false,
      error: error.message
    };
  }
});
